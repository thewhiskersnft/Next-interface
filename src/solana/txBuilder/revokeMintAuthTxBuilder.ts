import {
  AuthorityType,
  createSetAuthorityInstruction,
} from "@solana/spl-token";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection, PublicKey, Signer, Transaction } from "@solana/web3.js";

export const revokeMintAuthTxBuilder = async (
  connection: Connection,
  wallet: WalletContextState,
  tokenMint: PublicKey
) => {
  try {
    if (!wallet.publicKey) {
      return;
    }
    const revokeMintAuthInstruction = createSetAuthorityInstruction(
      tokenMint,
      wallet.publicKey,
      AuthorityType.MintTokens,
      null
    );
    const createRevokeMintAuthTransaction = new Transaction().add(
      revokeMintAuthInstruction
    );
    const createRevokeMintAuthTransactionSignature =
      await wallet.sendTransaction(createRevokeMintAuthTransaction, connection);
    return createRevokeMintAuthTransactionSignature;
  } catch (error) {
    console.log(error);
    return "";
  }
};
