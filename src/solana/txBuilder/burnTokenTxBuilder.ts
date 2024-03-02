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
import { WalletContextState } from "@solana/wallet-adapter-react";
import {
  Connection,
  PublicKey,
  Signer,
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
      return;
    }
    let Tx = new Transaction();

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
    Tx.add(burnTokenInstruction);

    const createBurnTokensTransactionSignature = await wallet.sendTransaction(
      Tx,
      connection
    );
    return createBurnTokensTransactionSignature;
  } catch (error) {
    console.log(error);
    return "";
  }
};
