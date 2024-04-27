import { errorToast, successToast } from "@/component/common/toast";
import {
  PLATFORM_FEE_SOL_TOKEN_CREATION,
  PLATFORM_OWNER_ADDRESS,
  TransactionSource,
  TransactionType,
} from "@/constants";
import rewardService from "@/services/rewardService";
import { getLocalGUID } from "@/utils/apiService";
import { getSignatureURL } from "@/utils/redirectURLs";
import { recursiveCheckTransitionStatus } from "@/utils/transactions";
import { getPriorityLambports } from "@/utils/transactions/getPriorityLambports";
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
  tokenAmount: string,
  priorityFees: number
) => {
  try {
    if (!wallet.publicKey) {
      errorToast({ message: "Wallet Not Connected" });
      return;
    }

    let Tx = new Transaction();

    const mintAccount = await getMint(connection, tokenMint);

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
    const PRIORITY_FEE_IX = getPriorityLambports(priorityFees);
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
      let mintTokenResp = await rewardService.addUserPoints({
        trans_type: TransactionType.Rewarded,
        trans_source: TransactionSource.MintTokens,
        user_guid: getLocalGUID(),
      });
      successToast({
        keyPairs: {
          signature: {
            value: `${createMintTokensTransactionSignature}`,
            // linkTo: `https://solscan.io/tx/${createMintTokensTransactionSignature}?cluster=devnet`,
            linkTo: getSignatureURL(createMintTokensTransactionSignature),
          },
        },
        allowCopy: true,
      });
    }

    return resp ? createMintTokensTransactionSignature : null;
  } catch (error) {
    errorToast({ message: "Please Try Again!" });
    console.warn(error);
    return "";
  }
};
