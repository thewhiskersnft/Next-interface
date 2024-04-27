import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getMinimumBalanceForRentExemptMint,
  createInitializeMintInstruction,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
  MINT_SIZE,
  TYPE_SIZE,
  LENGTH_SIZE,
  ExtensionType,
  getMintLen,
  TOKEN_2022_PROGRAM_ID,
  createInitializeMetadataPointerInstruction,
  createInitializeTransferFeeConfigInstruction,
  createInitializeInterestBearingMintInstruction,
  AccountState,
  createInitializeDefaultAccountStateInstruction,
  createInitializePermanentDelegateInstruction,
  createInitializeNonTransferableMintInstruction,
} from "@solana/spl-token";
import {
  CreateMetadataAccountV3InstructionAccounts,
  CreateMetadataAccountV3InstructionArgs,
  CreateMetadataAccountV3InstructionData,
  createMetadataAccountV3,
} from "@metaplex-foundation/mpl-token-metadata";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  fromWeb3JsPublicKey,
  toWeb3JsPublicKey,
} from "@metaplex-foundation/umi-web3js-adapters";

import {
  ComputeBudgetProgram,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  clusterApiUrl,
} from "@solana/web3.js";
import { getMetadataPda } from "../pda/getMetadataPda";
import { WalletContextState } from "@solana/wallet-adapter-react";
import {} from "@metaplex-foundation/umi";
import {
  PLATFORM_FEE_SOL_TOKEN_CREATION,
  PLATFORM_OWNER_ADDRESS,
  TransactionSource,
  TransactionType,
} from "@/constants";
import { isMainnet } from "@/global/hook/getConnectedClusterInfo";
import { errorToast, successToast } from "@/component/common/toast";
import { recursiveCheckTransitionStatus } from "@/utils/transactions";
import { getMintURL, getSignatureURL } from "@/utils/redirectURLs";
import { getPriorityLambports } from "@/utils/transactions/getPriorityLambports";
import {
  createInitializeInstruction,
  createUpdateFieldInstruction,
  createRemoveKeyInstruction,
  pack,
  TokenMetadata,
} from "@solana/spl-token-metadata";
import rewardService from "@/services/rewardService";
import { getLocalGUID } from "@/utils/apiService";
let network = isMainnet() ? "mainnet-beta" : "devnet";

type TransferTaxProps = {
  fee: string;
  maxFee: string;
  withdrawAuthority: string;
  configAuthority: string;
};

type IntrestBearingProps = {
  rate: string;
};

type DefaultAccountStateProps = {
  defaultState: string;
};

type PermanentDelegateProps = {
  delegate: string;
};

export const createToken22TxBuilder = async (
  name: string,
  symbol: string,
  decimal: number,
  transferTax: TransferTaxProps | null,
  intrestBearing: IntrestBearingProps | null,
  defaultAccountState: DefaultAccountStateProps | null,
  permanentDelegate: PermanentDelegateProps | null,
  nonTransferable: boolean,
  uri: string,
  tokenSupply: number,
  connection: Connection,
  wallet: WalletContextState,
  endpoint: string,
  priorityFees: number
) => {
  try {
    if (!wallet.publicKey) {
      return;
    }

    const token22_mint = Keypair.generate();
    console.log(wallet.publicKey, "wallet");
    console.log(token22_mint.publicKey, "token22_mint");

    const ON_CHAIN_METADATA: TokenMetadata = {
      name: name,
      symbol: symbol,
      uri: uri,
      mint: token22_mint.publicKey,
      additionalMetadata: [
        ["key", "value"],
        ["custom", "data"],
      ],
      updateAuthority: wallet.publicKey,
    };

    // Define the extensions to be used by the mint
    const extensions = [ExtensionType.MetadataPointer];

    if (transferTax) {
      extensions.push(ExtensionType.TransferFeeConfig);
    }

    if (intrestBearing) {
      extensions.push(ExtensionType.InterestBearingConfig);
    }

    if (defaultAccountState) {
      extensions.push(ExtensionType.DefaultAccountState);
    }

    if (permanentDelegate) {
      extensions.push(ExtensionType.PermanentDelegate);
    }

    if (nonTransferable) {
      extensions.push(ExtensionType.NonTransferable);
    }

    // Instruction to initialize the MetadataPointer Extension
    const initializeMetadataPointerInstruction =
      createInitializeMetadataPointerInstruction(
        token22_mint.publicKey, // wallet.publicKey Account address
        wallet.publicKey, // Authority that can set the metadata address
        token22_mint.publicKey, // Account address that holds the metadata
        TOKEN_2022_PROGRAM_ID
      );

    // Instruction to initialize Mint Account data
    const initializeMintInstruction = createInitializeMintInstruction(
      token22_mint.publicKey, // Mint Account Address
      decimal, // Decimals of Mint
      wallet.publicKey, // Designated Mint Authority
      wallet.publicKey, // Optional Freeze Authority
      TOKEN_2022_PROGRAM_ID // Token Extension Program ID
    );

    // Instruction to initialize Metadata Account data
    const initializeMetadataInstruction = createInitializeInstruction({
      programId: TOKEN_2022_PROGRAM_ID, // Token Extension Program as Metadata Program
      metadata: token22_mint.publicKey, // Account address that holds the metadata
      updateAuthority: wallet.publicKey, // Authority that can update the metadata
      mint: token22_mint.publicKey, // Mint Account address
      mintAuthority: wallet.publicKey, // Designated Mint Authority
      name: ON_CHAIN_METADATA.name,
      symbol: ON_CHAIN_METADATA.symbol,
      uri: ON_CHAIN_METADATA.uri,
    });

    const associatedTokenAccount = await getAssociatedTokenAddress(
      token22_mint.publicKey,
      wallet.publicKey,
      false,
      TOKEN_2022_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    );

    const createATAInstruction = createAssociatedTokenAccountInstruction(
      wallet.publicKey,
      associatedTokenAccount,
      wallet.publicKey,
      token22_mint.publicKey,
      TOKEN_2022_PROGRAM_ID
    );

    const mintTokensInstruction = createMintToInstruction(
      token22_mint.publicKey,
      associatedTokenAccount,
      wallet.publicKey,
      tokenSupply * 10 ** decimal,
      undefined,
      TOKEN_2022_PROGRAM_ID
    );

    const sentPlatFormfeeInstruction = SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: new PublicKey(PLATFORM_OWNER_ADDRESS),
      lamports: PLATFORM_FEE_SOL_TOKEN_CREATION * LAMPORTS_PER_SOL,
    });
    const PRIORITY_FEE_IX = getPriorityLambports(priorityFees);

    // Size of MetadataExtension 2 bytes for type, 2 bytes for length
    const metadataExtension = TYPE_SIZE + LENGTH_SIZE;
    // Size of metadata
    const metadataLen = pack(ON_CHAIN_METADATA).length;

    // Calculate the length of the mint
    const mintLen = getMintLen(extensions);

    const mintLamports = await connection.getMinimumBalanceForRentExemption(
      mintLen + metadataExtension + metadataLen
    );

    const mintToken2022Transaction = new Transaction();

    mintToken2022Transaction.add(
      SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: token22_mint.publicKey,
        space: mintLen,
        lamports: mintLamports,
        programId: TOKEN_2022_PROGRAM_ID,
      })
    );

    if (intrestBearing) {
      // Instruction to initialize the InterestBearingConfig Extension
      const initializeInterestBearingMintInstruction =
        createInitializeInterestBearingMintInstruction(
          token22_mint.publicKey, // Mint Account address
          wallet.publicKey, // Designated Rate Authority
          parseInt(intrestBearing?.rate!) * 100, // Interest rate basis points
          TOKEN_2022_PROGRAM_ID // Token Extension Program ID
        );
      mintToken2022Transaction.add(initializeInterestBearingMintInstruction);
    }

    if (transferTax) {
      const configAuthority = new PublicKey(transferTax?.configAuthority!);
      const withdrawAuthority = new PublicKey(transferTax?.withdrawAuthority!);
      const feeBasisPoints = Number(transferTax?.fee!) * 100;
      // maximum fee to collect on transfers
      const maxFee =
        BigInt(transferTax?.maxFee) !== BigInt(0)
          ? BigInt(Number(transferTax?.maxFee) * 10 ** decimal)
          : BigInt(tokenSupply * 10 ** decimal);

      const initializeTransferFeeConfig =
        createInitializeTransferFeeConfigInstruction(
          token22_mint.publicKey, // token mint account
          configAuthority, // authority that can update fees
          withdrawAuthority, // authority that can withdraw fees
          feeBasisPoints, // amount of transfer collected as fees
          maxFee, // maximum fee to collect on transfers
          TOKEN_2022_PROGRAM_ID // SPL token program id
        );
      mintToken2022Transaction.add(initializeTransferFeeConfig);
    }

    if (defaultAccountState) {
      let defaultState = AccountState.Initialized;

      switch (defaultAccountState.defaultState) {
        case "Uninitialized":
          defaultState = AccountState.Uninitialized;

        case "Initialized":
          defaultState = AccountState.Initialized;
        case "Frozen":
          defaultState = AccountState.Frozen;
      }
      // Set default account state as Frozen

      // Instruction to initialize the DefaultAccountState Extension
      const initializeDefaultAccountStateInstruction =
        createInitializeDefaultAccountStateInstruction(
          token22_mint.publicKey, // Mint Account address
          defaultState, // Default AccountState
          TOKEN_2022_PROGRAM_ID // Token Extension Program ID
        );
      mintToken2022Transaction.add(initializeDefaultAccountStateInstruction);
    }

    if (permanentDelegate) {
      // Instruction to initialize the PermanentDelegate Extension
      const initializePermanentDelegateInstruction =
        createInitializePermanentDelegateInstruction(
          token22_mint.publicKey, // Mint Account address
          new PublicKey(permanentDelegate.delegate), // Designated Permanent Delegate
          TOKEN_2022_PROGRAM_ID // Token Extension Program ID
        );
      mintToken2022Transaction.add(initializePermanentDelegateInstruction);
    }

    if (nonTransferable) {
      // Instruction to initialize the NonTransferable Extension
      const initializeNonTransferableMintInstruction =
        createInitializeNonTransferableMintInstruction(
          token22_mint.publicKey, // Mint Account address
          TOKEN_2022_PROGRAM_ID // Token Extension Program ID
        );
      mintToken2022Transaction.add(initializeNonTransferableMintInstruction);
    }

    mintToken2022Transaction.add(
      initializeMetadataPointerInstruction,
      initializeMintInstruction,
      initializeMetadataInstruction,
      createATAInstruction,
      mintTokensInstruction,
      sentPlatFormfeeInstruction,
      PRIORITY_FEE_IX
    );

    const createAccountSignature = await wallet.sendTransaction(
      mintToken2022Transaction,
      connection,
      {
        signers: [token22_mint],
      }
    );
    console.log(createAccountSignature);
    const startTime = Date.now();
    // while()
    //console.log(" Now : ", startTime);
    // 2afRSao7JckbxdV4p1Ak3jcD7uKsW4C7kY2tRukyXLtncdiTW4jpiaZDSR4nKYveok1WYzXgyc337PY3bAmJkzoK', mint: '5Pm6NTDoRYHjyy36XyJy3bY8ezpPHnzfLvug1zrHuhKK
    // let resp = await recursiveCheckTransitionStatus(
    //   startTime,
    //   // "2afRSao7JckbxdV4p1Ak3jcD7uKsW4C7kY2tRukyXLtncdiTW4jpiaZDSR4nKYveok1WYzXgyc337PY3bAmJkzoK",
    //   createAccountSignature,
    //   connection,
    //   wallet,
    //   createTokentTransaction,
    //   mint_account,
    //   0
    // );
    // //console.log("Resp : ", resp);
    let resp = await recursiveCheckTransitionStatus(
      Date.now(),
      createAccountSignature,
      connection,
      wallet
    );
    if (resp) {
      let updateTokenResp = await rewardService.addUserPoints({
        trans_type: TransactionType.Rewarded,
        trans_source: TransactionSource.CreateToken,
        user_guid: getLocalGUID(),
      });
      successToast({
        keyPairs: {
          mintAddress: {
            value: `${token22_mint.publicKey.toBase58()}`,
            // linkTo: `https://solscan.io/token/${mint_account.publicKey.toBase58()}?cluster=devnet`,
            linkTo: getMintURL(token22_mint.publicKey.toBase58()),
          },
          signature: {
            value: `${createAccountSignature}`,
            // linkTo: `https://solscan.io/tx/${createAccountSignature}?cluster=devnet`,
            linkTo: getSignatureURL(createAccountSignature),
          },
        },
        allowCopy: true,
      });
    } else {
      // error message already displayed in recursiveCheckTransitionStatus
    }
    return resp
      ? {
          sig: createAccountSignature,
          mint: token22_mint.publicKey.toBase58(),
        }
      : null;
  } catch (error) {
    console.log(error);
  }
};
