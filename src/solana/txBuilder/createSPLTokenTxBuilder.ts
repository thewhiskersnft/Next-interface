import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getMinimumBalanceForRentExemptMint,
  createInitializeMintInstruction,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
  MINT_SIZE,
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
export const createSPLTokenTxBuilder = async (
  name: string,
  symbol: string,
  decimal: number,
  uri: string,
  tokenSupply: number,
  connection: Connection,
  wallet: WalletContextState
) => {
  try {
    if (!wallet.publicKey) {
      return;
    }
    const ON_CHAIN_METADATA = {
      name: name,
      symbol: symbol,
      uri: uri,
      sellerFeeBasisPoints: 0,
      creators: null,
      collection: null,
      uses: null,
    };

    const MINT_CONFIG = {
      numDecimals: decimal,
      numberTokens: tokenSupply,
    };

    const mint_rent = await getMinimumBalanceForRentExemptMint(connection);
    // console.log("mint_rent", mint_rent);

    const mint_account = Keypair.generate();
    // console.log("mint_account", mint_account.publicKey.toBase58());

    const [metadataPDA] = getMetadataPda(mint_account.publicKey);
    // console.log("metadataPDA", metadataPDA.toBase58());

    const owner = wallet.publicKey!;
    // console.log("owner", owner.toBase58());

    const endpoint = clusterApiUrl("devnet");
    const umi = createUmi(endpoint);

    const createMintAccountInstruction = SystemProgram.createAccount({
      fromPubkey: owner,
      newAccountPubkey: mint_account.publicKey,
      space: MINT_SIZE,
      lamports: mint_rent,
      programId: TOKEN_PROGRAM_ID,
    });

    const InitMint = createInitializeMintInstruction(
      mint_account.publicKey,
      MINT_CONFIG.numDecimals,
      owner,
      owner,
      TOKEN_PROGRAM_ID
    );

    const associatedTokenAccount = await getAssociatedTokenAddress(
      mint_account.publicKey,
      owner
    );

    const createATAInstruction = createAssociatedTokenAccountInstruction(
      owner,
      associatedTokenAccount,
      owner,
      mint_account.publicKey
    );

    const mintInstruction = createMintToInstruction(
      mint_account.publicKey,
      associatedTokenAccount,
      owner,
      MINT_CONFIG.numberTokens * 10 ** MINT_CONFIG.numDecimals
    );
    const args: CreateMetadataAccountV3InstructionArgs = {
      data: {
        name: ON_CHAIN_METADATA.name,
        symbol: ON_CHAIN_METADATA.symbol,
        uri: ON_CHAIN_METADATA.uri,
        sellerFeeBasisPoints: 0,
        collection: null,
        creators: [
          {
            address: fromWeb3JsPublicKey(wallet.publicKey),
            verified: true,
            share: 100,
          },
        ],
        uses: null,
      },
      isMutable: true,
      collectionDetails: null,
    };
    //The tx builder expects the type of mint authority and signer to be `Signer`, so built a dummy Signer instance
    const signer = {
      publicKey: fromWeb3JsPublicKey(wallet.publicKey),
      signTransaction: null,
      signMessage: null,
      signAllTransactions: null,
    };

    //Metadata account IX Accounts
    const accounts: CreateMetadataAccountV3InstructionAccounts = {
      metadata: fromWeb3JsPublicKey(metadataPDA),
      mint: fromWeb3JsPublicKey(mint_account.publicKey),
      //@ts-ignore
      payer: signer,
      //@ts-ignore
      mintAuthority: signer,
      updateAuthority: fromWeb3JsPublicKey(wallet.publicKey),
    };

    const fullMetadataInstructionArgs = { ...accounts, ...args };

    const metadataBuilder = createMetadataAccountV3(
      umi,
      fullMetadataInstructionArgs
    );
    const metadataInstruction: any = metadataBuilder.getInstructions()[0];
    metadataInstruction.keys = metadataInstruction.keys.map((key: any) => {
      const newKey = { ...key };
      newKey.pubkey = toWeb3JsPublicKey(key.pubkey);
      return newKey;
    });

    const sentPlatFormfeeInstruction = SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: new PublicKey(PLATFORM_OWNER_ADDRESS),
      lamports: PLATFORM_FEE_SOL_TOKEN_CREATION * LAMPORTS_PER_SOL,
    });

    const createTokentTransaction = new Transaction().add(
      createMintAccountInstruction,
      InitMint,
      createATAInstruction,
      mintInstruction,
      metadataInstruction,
      sentPlatFormfeeInstruction
    );

    const createAccountSignature = await wallet.sendTransaction(
      createTokentTransaction,
      connection,
      { signers: [mint_account] }
    );
    return {
      sig: createAccountSignature,
      mint: mint_account.publicKey.toBase58(),
    };
  } catch (error) {
    // console.log(error);
  }
};
