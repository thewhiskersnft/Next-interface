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
} from "@/constants";
import { isMainnet } from "@/global/hook/getConnectedClusterInfo";
import { errorToast, successToast } from "@/component/toast";
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
let network = isMainnet() ? "mainnet-beta" : "devnet";

export const createToken22TxBuilder = async (
  name: string,
  symbol: string,
  decimal: number,
  fee: string,
  maxFee: string,
  withdrawAuthority: string,
  configAuthority: string,
  rate: string,
  defaultAccountStateOption: string,
  delegate: string,
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

    // Size of MetadataExtension 2 bytes for type, 2 bytes for length
    const metadataExtension = TYPE_SIZE + LENGTH_SIZE;
    // Size of metadata
    const metadataLen = pack(ON_CHAIN_METADATA).length;

    // Size of Mint Account with extension
    const mintLen = getMintLen([ExtensionType.MetadataPointer]);

    // Minimum lamports required for Mint Account
    const lamports = await connection.getMinimumBalanceForRentExemption(
      mintLen + metadataExtension + metadataLen
    );

    // Instruction to invoke System Program to create new account
    const createAccountInstruction = SystemProgram.createAccount({
      fromPubkey: wallet.publicKey, // Account that will transfer lamports to created account
      newAccountPubkey: token22_mint.publicKey, // Address of the account to create
      space: mintLen, // Amount of bytes to allocate to the created account
      lamports, // Amount of lamports transferred to created account
      programId: TOKEN_2022_PROGRAM_ID, // Program assigned as owner of created account
    });

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
      null, // Optional Freeze Authority
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

    // Instruction to update metadata, adding custom field
    const updateFieldInstruction = createUpdateFieldInstruction({
      programId: TOKEN_2022_PROGRAM_ID, // Token Extension Program as Metadata Program
      metadata: token22_mint.publicKey, // Account address that holds the metadata
      updateAuthority: wallet.publicKey, // Authority that can update the metadata
      field: ON_CHAIN_METADATA.additionalMetadata[0][0], // key
      value: ON_CHAIN_METADATA.additionalMetadata[0][1], // value
    });

    const sentPlatFormfeeInstruction = SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: new PublicKey(PLATFORM_OWNER_ADDRESS),
      lamports: PLATFORM_FEE_SOL_TOKEN_CREATION * LAMPORTS_PER_SOL,
    });
    const PRIORITY_FEE_IX = getPriorityLambports(priorityFees);
    const createTokentTransaction = new Transaction().add(
      createAccountInstruction,
      initializeMetadataPointerInstruction,
      // note: the above instructions are required before initializing the mint
      initializeMintInstruction,
      initializeMetadataInstruction,
      updateFieldInstruction,
      createATAInstruction,
      mintTokensInstruction,
      sentPlatFormfeeInstruction,
      PRIORITY_FEE_IX
    );

    const createAccountSignature = await wallet.sendTransaction(
      createTokentTransaction,
      connection,
      { signers: [token22_mint] }
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
