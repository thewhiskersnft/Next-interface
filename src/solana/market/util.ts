import {
  buildSimpleTransaction,
  findProgramAddress,
  InnerSimpleV0Transaction,
  SPL_ACCOUNT_LAYOUT,
  TOKEN_PROGRAM_ID,
  TokenAccount,
} from "@raydium-io/raydium-sdk";
import {
  Connection,
  Keypair,
  PublicKey,
  SendOptions,
  Signer,
  Transaction,
  VersionedTransaction,
} from "@solana/web3.js";
import { addLookupTableInfo, makeTxVersion } from "./config";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { recursiveCheckTransitionStatus } from "@/utils/transactions";
import { errorToast } from "@/component/common/toast";

export async function sendTx(
  connection: Connection,
  wallet: WalletContextState,
  txs: (VersionedTransaction | Transaction)[],
  options?: SendOptions
): Promise<string[]> {
  const txids: string[] = [];
  const signedTransactionArray = await wallet.signAllTransactions!(txs);
  console.log(signedTransactionArray);
  for (let i = 0; i < signedTransactionArray.length; i++) {
    // await sleepTime(15 * 1000);
    const transactionResponse = await connection.sendRawTransaction(
      signedTransactionArray[i].serialize()
    );
    const timeNow = new Date();
    const isTxConfirmed = recursiveCheckTransitionStatus(
      timeNow,
      transactionResponse,
      connection,
      wallet
    );
    if (!isTxConfirmed) {
      errorToast({
        message: "Solana Not Able To Broadcast TXN, Please Try Again",
      });
      i = signedTransactionArray.length;
      break;
    }
    console.log(transactionResponse);
    txids.push(transactionResponse);
  }
  return txids;
}

export async function getWalletTokenAccount(
  connection: Connection,
  wallet: PublicKey
): Promise<TokenAccount[]> {
  const walletTokenAccount = await connection.getTokenAccountsByOwner(wallet, {
    programId: TOKEN_PROGRAM_ID,
  });
  return walletTokenAccount.value.map((i) => ({
    pubkey: i.pubkey,
    programId: i.account.owner,
    accountInfo: SPL_ACCOUNT_LAYOUT.decode(i.account.data),
  }));
}

export async function buildAndSendTx(
  innerSimpleV0Transaction: InnerSimpleV0Transaction[],
  connection: Connection,
  wallet: WalletContextState,
  options?: SendOptions
) {
  const willSendTx = await buildSimpleTransaction({
    connection,
    makeTxVersion,
    payer: wallet.publicKey!,
    innerTransactions: innerSimpleV0Transaction,
    addLookupTableInfo: addLookupTableInfo,
  });

  return await sendTx(connection, wallet, willSendTx, options);
}

export function getATAAddress(
  programId: PublicKey,
  owner: PublicKey,
  mint: PublicKey
) {
  const { publicKey, nonce } = findProgramAddress(
    [owner.toBuffer(), programId.toBuffer(), mint.toBuffer()],
    new PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL")
  );
  return { publicKey, nonce };
}

export async function sleepTime(ms: number) {
  console.log(new Date().toLocaleString(), "sleepTime", ms);
  return new Promise((resolve) => setTimeout(resolve, ms));
}
