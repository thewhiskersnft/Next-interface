import {
  AuthorityType,
  createSetAuthorityInstruction,
} from "@solana/spl-token";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { errorToast, successToast } from "../../component/toast";


export const revokeFreezeAuthTxBuilder = async (
  connection: Connection,
  wallet: WalletContextState,
  tokenMint: PublicKey
) => {
  try {
    if (!wallet.publicKey) {
      errorToast({ message:  "Wallet not Connected" });
      return;
    }
    const revokeMintAuthInstruction = createSetAuthorityInstruction(
      tokenMint,
      wallet.publicKey,
      AuthorityType.FreezeAccount,
      null
    );
    const createRevokeFreezeAuthTransaction = new Transaction().add(
      revokeMintAuthInstruction
    );
    const createRevokeFreezeAuthTransactionSignature =
      await wallet.sendTransaction(
        createRevokeFreezeAuthTransaction,
        connection
      );
    return createRevokeFreezeAuthTransactionSignature;
  } catch (error) {
    console.log(error);
    errorToast({ message: "Please try again" });
    return "";
  }
};
