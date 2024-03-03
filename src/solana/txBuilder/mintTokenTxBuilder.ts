import { errorToast } from "@/component/toast";
import {
  AuthorityType,
  createAssociatedTokenAccountInstruction,
  createMintToCheckedInstruction,
  createSetAuthorityInstruction,
  getAssociatedTokenAddress,
  getMint,
  getOrCreateAssociatedTokenAccount,
} from "@solana/spl-token";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection, PublicKey, Signer, Transaction } from "@solana/web3.js";

export const createMintTokensTxBuilder = async (
  connection: Connection,
  wallet: WalletContextState,
  tokenMint: PublicKey,
  tokenAmount: string
) => {
  try {
    if (!wallet.publicKey) {
      errorToast({ message:  "Wallet not Connected" });
      return;
    }

    let Tx = new Transaction();

    const mintAccount = await getMint(connection, tokenMint);
    console.log("mintAccount", mintAccount);

    const destination_account = await getAssociatedTokenAddress(
      tokenMint,
      wallet.publicKey
    );

    const account = await connection.getAccountInfo(destination_account);
    if (account == null) {
      const createATAIx = createAssociatedTokenAccountInstruction(
        wallet.publicKey,
        destination_account,
        wallet.publicKey,
        tokenMint
      );

      Tx.add(createATAIx);
    }

    const mintTokenInstruction = createMintToCheckedInstruction(
      tokenMint,
      destination_account,
      wallet.publicKey,
      BigInt(parseInt(tokenAmount) * 10 ** mintAccount.decimals),
      mintAccount.decimals
    );
    Tx.add(mintTokenInstruction);

    const createMintTokensTransactionSignature = await wallet.sendTransaction(
      Tx,
      connection
    );
    return createMintTokensTransactionSignature;
  } catch (error) {
    console.log(error);
    return "";
  }
};
