import { errorToast } from "@/component/toast";
import {
  AuthorityType,
  TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  createBurnCheckedInstruction,
  createCloseAccountInstruction,
  createMintToCheckedInstruction,
  createSetAuthorityInstruction,
  getAssociatedTokenAddress,
  getMint,
  getOrCreateAssociatedTokenAccount,
} from "@solana/spl-token";
import {
  PLATFORM_FEE_SOL_TOKEN_CREATION,
  PLATFORM_OWNER_ADDRESS,
} from "@/constants";

import { WalletContextState } from "@solana/wallet-adapter-react";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  Signer,
  SystemProgram,
  Transaction,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";

export const createBurnTokensTxBuilder = async (
  connection: Connection,
  wallet: WalletContextState,
  tokenMint: PublicKey,
  tokenAmount: string
) => {
  try {
    if (!wallet.publicKey) {
      errorToast({ message: "Wallet Not Connected" });

      return;
    }
    // let Tx = new Transaction();

    const mintAccount = await getMint(connection, tokenMint);

    const destination_account = await getAssociatedTokenAddress(
      tokenMint,
      wallet.publicKey
    );

    const amount = BigInt(parseInt(tokenAmount) * 10 ** mintAccount.decimals);
    const burnTokenInstruction = createBurnCheckedInstruction(
      destination_account,
      tokenMint,
      wallet.publicKey,
      amount,
      mintAccount.decimals
    );

    const sentPlatFormfeeInstruction = SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: new PublicKey(PLATFORM_OWNER_ADDRESS),
      lamports: PLATFORM_FEE_SOL_TOKEN_CREATION * LAMPORTS_PER_SOL,
    });

    // Tx.add(burnTokenInstruction);
    const createTransaction = new Transaction().add(
      burnTokenInstruction,
      sentPlatFormfeeInstruction
    );

    const createBurnTokensTransactionSignature = await wallet.sendTransaction(
      createTransaction,
      connection
    );
    return createBurnTokensTransactionSignature;
  } catch (error) {
    // console.log(error);
    errorToast({ message: "Insufficent balance!" });
    return "";
  }
};
