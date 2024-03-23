import { errorToast, successToast } from "@/component/common/toast";
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
import { getPriorityLambports } from "@/utils/transactions/getPriorityLambports";
import { recursiveCheckTransitionStatus } from "@/utils/transactions";
import { getSignatureURL } from "@/utils/redirectURLs";

export const createBurnTokensTxBuilder = async (
  connection: Connection,
  wallet: WalletContextState,
  tokenMint: PublicKey,
  tokenAmount: string,
  priorityFees: number
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
    const PRIORITY_FEE_IX = getPriorityLambports(priorityFees);
    const createTransaction = new Transaction().add(
      burnTokenInstruction,
      sentPlatFormfeeInstruction,
      PRIORITY_FEE_IX
    );

    const createBurnTokensTransactionSignature = await wallet.sendTransaction(
      createTransaction,
      connection
    );
    let resp = await recursiveCheckTransitionStatus(
      Date.now(),
      createBurnTokensTransactionSignature,
      connection,
      wallet
      // mint_account.publicKey.toBase58()
    );
    if (resp) {
      successToast({
        keyPairs: {
          signature: {
            value: `${createBurnTokensTransactionSignature}`,
            // linkTo: `https://solscan.io/tx/${createBurnTokensTransactionSignature}?cluster=devnet`,
            linkTo: getSignatureURL(createBurnTokensTransactionSignature),
          },
        },
        allowCopy: true,
      });
    }
    return resp ? createBurnTokensTransactionSignature : null;
  } catch (error) {
    // //console.log(error);
    errorToast({ message: "Insufficent balance!" });
    return "";
  }
};
