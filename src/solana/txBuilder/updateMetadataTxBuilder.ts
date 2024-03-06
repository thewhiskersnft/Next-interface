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
  UpdateMetadataAccountV2InstructionArgs,
  UpdateMetadataAccountV2InstructionAccounts,
  createMetadataAccountV3,
  updateMetadataAccountV2,
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
export const updateSPLTokenMetadataTxBuilder = async (
  name: string,
  symbol: string,
  uri: string,
  connection: Connection,
  wallet: WalletContextState,
  mintAddress: PublicKey
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

    const [metadataPDA] = getMetadataPda(mintAddress);
    // console.log("metadataPDA", metadataPDA.toBase58());

    const endpoint = clusterApiUrl("devnet");
    const umi = createUmi(endpoint);

    const args: UpdateMetadataAccountV2InstructionArgs = {
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
    };
    //The tx builder expects the type of mint authority and signer to be `Signer`, so built a dummy Signer instance
    const signer = {
      publicKey: fromWeb3JsPublicKey(wallet.publicKey),
      signTransaction: null,
      signMessage: null,
      signAllTransactions: null,
    };

    //Metadata account IX Accounts
    const accounts: UpdateMetadataAccountV2InstructionAccounts = {
      metadata: fromWeb3JsPublicKey(metadataPDA),
      //@ts-ignore
      updateAuthority: signer,
    };

    const fullMetadataInstructionArgs = { ...accounts, ...args };

    const metadataBuilder = updateMetadataAccountV2(
      umi,
      fullMetadataInstructionArgs
    );
    const update_metadataInstruction: any =
      metadataBuilder.getInstructions()[0];
    update_metadataInstruction.keys = update_metadataInstruction.keys.map(
      (key: any) => {
        const newKey = { ...key };
        newKey.pubkey = toWeb3JsPublicKey(key.pubkey);
        return newKey;
      }
    );
    console.log("Successfully Added Update Metadata Instructions");

    const sentPlatFormfeeInstruction = SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: new PublicKey(PLATFORM_OWNER_ADDRESS),
      lamports: PLATFORM_FEE_SOL_TOKEN_CREATION * LAMPORTS_PER_SOL,
    });

    const createTokentTransaction = new Transaction().add(
      update_metadataInstruction,
      sentPlatFormfeeInstruction
    );

    const createAccountSignature = await wallet.sendTransaction(
      createTokentTransaction,
      connection
    );
    return {
      sig: createAccountSignature,
      mint: mintAddress.toBase58(),
    };
  } catch (error) {
    console.log(error);
  }
};
