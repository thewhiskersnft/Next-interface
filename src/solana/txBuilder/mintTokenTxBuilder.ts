import { errorToast } from "@/component/toast";
import {
  PLATFORM_FEE_SOL_TOKEN_CREATION,
  PLATFORM_OWNER_ADDRESS,
} from "@/constants";
import { recursiveCheckTransitionStatus } from "@/utils/transactions";
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
  ComputeBudgetProgram,
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
      errorToast({ message: "Wallet Not Connected" });
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



    const PRIORITY_FEE_IX = ComputeBudgetProgram.setComputeUnitPrice({
      microLamports: 300,
    });
    Tx.add(PRIORITY_FEE_IX);

    const createMintTokensTransactionSignature = await wallet.sendTransaction(
      Tx,
      connection
    );

    let resp = await recursiveCheckTransitionStatus(
      Date.now(),
      createMintTokensTransactionSignature,
      connection,
      wallet
      // mint_account.publicKey.toBase58()
    );
    if (resp) {
    }

    return createMintTokensTransactionSignature;
  } catch (error) {
    errorToast({ message: "Please Try Again!" });
    // console.log(error);
    return "";
  }
};
