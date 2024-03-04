import { errorToast } from "@/component/toast";
import {
  PLATFORM_FEE_SOL_TOKEN_CREATION,
  PLATFORM_OWNER_ADDRESS,
} from "@/constants";
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
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  Signer,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

export const createMintTokensTxBuilder = async (
  connection: Connection,
  wallet: WalletContextState,
  tokenMint: PublicKey,
  tokenAmount: string
) => {
  try {
    if (!wallet.publicKey) {
      errorToast({ message: "Wallet not Connected" });
      return;
    }

    let Tx = new Transaction();

    const mintAccount = await getMint(connection, tokenMint);
    // console.log("mintAccount", mintAccount);

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

    const sentPlatFormfeeInstruction = SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: new PublicKey(PLATFORM_OWNER_ADDRESS),
      lamports: PLATFORM_FEE_SOL_TOKEN_CREATION * LAMPORTS_PER_SOL,
    });

    Tx.add(sentPlatFormfeeInstruction);

    const createMintTokensTransactionSignature = await wallet.sendTransaction(
      Tx,
      connection
    );
    return createMintTokensTransactionSignature;
  } catch (error) {
    errorToast({ message: "Please Try Again!" });
    // console.log(error);
    return "";
  }
};
