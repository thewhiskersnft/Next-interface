import { errorToast, successToast } from "@/component/toast";
import {
  PLATFORM_FEE_SOL_TOKEN_CREATION,
  PLATFORM_OWNER_ADDRESS,
} from "@/constants";
import { getSignatureURL } from "@/utils/redirectURLs";
import { recursiveCheckTransitionStatus } from "@/utils/transactions";
import { getPriorityLambports } from "@/utils/transactions/getPriorityLambports";
import {
  AuthorityType,
  createSetAuthorityInstruction,
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

export const revokeMintAuthTxBuilder = async (
  connection: Connection,
  wallet: WalletContextState,
  tokenMint: PublicKey,
  priorityFees: number
) => {
  try {
    if (!wallet.publicKey) {
      errorToast({ message: "Wallet Not Connected" });

      return;
    }
    const revokeMintAuthInstruction = createSetAuthorityInstruction(
      tokenMint,
      wallet.publicKey,
      AuthorityType.MintTokens,
      null
    );

    const sentPlatFormfeeInstruction = SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: new PublicKey(PLATFORM_OWNER_ADDRESS),
      lamports: PLATFORM_FEE_SOL_TOKEN_CREATION * LAMPORTS_PER_SOL,
    });
    const PRIORITY_FEE_IX = getPriorityLambports(priorityFees);
    const createRevokeMintAuthTransaction = new Transaction().add(
      revokeMintAuthInstruction,
      sentPlatFormfeeInstruction,
      PRIORITY_FEE_IX
    );
    const createRevokeMintAuthTransactionSignature =
      await wallet.sendTransaction(createRevokeMintAuthTransaction, connection);

    let resp = await recursiveCheckTransitionStatus(
      Date.now(),
      createRevokeMintAuthTransactionSignature,
      connection,
      wallet
      // mint_account.publicKey.toBase58()
    );
    if (resp) {
      successToast({
        keyPairs: {
          signature: {
            value: `${createRevokeMintAuthTransactionSignature}`,
            // linkTo: `https://solscan.io/tx/${createRevokeMintAuthTransactionSignature}?cluster=devnet`,
            linkTo: getSignatureURL(createRevokeMintAuthTransactionSignature),
          },
        },
        allowCopy: true,
      });
    }

    return resp ? createRevokeMintAuthTransactionSignature : null;
  } catch (error) {
    // //console.log(error);
    return "";
  }
};
