import {
  AuthorityType,
  createSetAuthorityInstruction,
} from "@solana/spl-token";
import { WalletContextState } from "@solana/wallet-adapter-react";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { errorToast, successToast } from "../../component/toast";
import {
  PLATFORM_FEE_SOL_TOKEN_CREATION,
  PLATFORM_OWNER_ADDRESS,
} from "@/constants";
import { recursiveCheckTransitionStatus } from "@/utils/transactions";

export const revokeFreezeAuthTxBuilder = async (
  connection: Connection,
  wallet: WalletContextState,
  tokenMint: PublicKey
) => {
  try {
    if (!wallet.publicKey) {
      errorToast({ message: "Wallet Not Connected" });
      return;
    }
    let Tx = new Transaction();

    const revokeMintAuthInstruction = createSetAuthorityInstruction(
      tokenMint,
      wallet.publicKey,
      AuthorityType.FreezeAccount,
      null
    );

    const sentPlatFormfeeInstruction = SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: new PublicKey(PLATFORM_OWNER_ADDRESS),
      lamports: PLATFORM_FEE_SOL_TOKEN_CREATION * LAMPORTS_PER_SOL,
    });

    const createRevokeFreezeAuthTransaction = new Transaction().add(
      revokeMintAuthInstruction,
      sentPlatFormfeeInstruction
    );

    const createRevokeFreezeAuthTransactionSignature =
      await wallet.sendTransaction(
        createRevokeFreezeAuthTransaction,
        connection
      );

      let resp = await recursiveCheckTransitionStatus(
        Date.now(),
        createRevokeFreezeAuthTransactionSignature,
        connection,
        wallet
        // mint_account.publicKey.toBase58()
      );
      if (resp) {
      }

    return createRevokeFreezeAuthTransactionSignature;
  } catch (error) {
    // console.log(error);
    return "";
  }
};
