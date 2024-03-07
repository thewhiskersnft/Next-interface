import { getAccount, getMint } from "@solana/spl-token";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  Signer,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

async function getTokenBalanceWeb3(
  connection: Connection,
  tokenAccount: PublicKey
) {
  try {
    const info = await getAccount(connection, tokenAccount);
    const amount = Number(info.amount);
    const mint = await getMint(connection, info.mint);
    const balance = amount / 10 ** mint.decimals;
    // console.log("Balance (using Solana-Web3.js): ", balance);
    return balance;
  } catch (e) {
    return;
  }
}
