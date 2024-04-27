import { errorToast, successToast } from "@/component/common/toast";
import { recursiveCheckTransitionStatus } from "@/utils/transactions";
import solanaWeb3, {
  Keypair,
  PublicKey,
  VersionedTransaction,
} from "@solana/web3.js";
import axios from "axios";
import base58 from "bs58";

export async function createPoolFluxBeam(
  tokenA: any,
  tokenAAmount: number,
  tokenB: any,
  tokenBAmount: number,
  decimal: number,
  pvtKey: string,
  connection: any,
  wallet: any
) {
  const privateKey = base58.decode(pvtKey);
  const payer = Keypair.fromSecretKey(privateKey);

  const data = {
    payer: wallet.publicKey.toString(), // check this Akshit
    token_a: new PublicKey(tokenA),
    token_a_amount: tokenAAmount * Math.pow(10, 9),
    token_b: new PublicKey(tokenB),
    token_b_amount: tokenBAmount * Math.pow(10, decimal),
    priority_fee_lamports: 10_000_000,
  };
  const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.post(
      "https://api.fluxbeam.xyz/v1/token_pools",
      data,
      { headers }
    );
    if (response.data && response.data.transaction) {
      const sig = await signtx(response.data.transaction, payer, connection);
      if (sig) {
        successToast({ message: "confirmation done" });
        return {
          success: true,
          signature: sig,
          lpPool: response.data.pool,
          lpMint: response.data.lp_mint,
        };
      } else {
        // log_error('no confirmed.');
        errorToast({ message: "Please try again. Network is conjested." });
        return {
          success: false,
          error: "Please try again. Network is conjested.",
        };
      }
    } else {
      return { success: false, error: "API did not return a transaction." };
    }
  } catch (error: any) {
    // log_error('Error calling the API:', error);
    return { success: false, error: error.message };
  }
}
async function signtx(rawTx: any, payer: any, connection: any) {
  try {
    const swapTransactionBuf = Buffer.from(rawTx, "base64");
    const txn = VersionedTransaction.deserialize(swapTransactionBuf);
    txn.sign([payer]);
    // const simulationResult = await connection.simulateTransaction(txn);
    const sig = await connection
      .sendRawTransaction(txn.serialize(), {
        skipPreflight: false,
        preflightCommitment: "processed",
      })
      .catch((e: any) => {
        //   console.error(sendRawTransaction Transaction Failed, e);
      });

    const resp = await recursiveCheckTransitionStatus(
      Date.now(),
      sig,
      connection
    );
    if (resp) {
      return sig;
    }
    return null;
  } catch (error) {
    console.error("Error sending transaction:", error);
  }
}

// createPoolFluxBeam(tokenA, tokenAAmount, tokenB, tokenBAmount, decimal, pvtKey)

//    createPoolFluxBeam(
//     "So11111111111111111111111111111111111111112",
//     0.001,
//     "GnNt5hMLTRh2CW9YXrUrRouQroQt8dJwcNSYu37nCtcH",
//     1000,
//     6,
//     "4N8EFytEqUWMeJ3tiT39XmmENNQMvbCwFh4bdkySuTWNBgRjBXjJcu4AewKWuGz9Gvq4XJZgZMbibt7UPxMPV84W"
// ).then(result => {
//     if (result.success) {
//     } else {
//         //log_error('Transaction failed:', result.error);
//     }
// }).catch(error => {
//     //log_error('Unhandled error:', error.message);
// });
// module.exports = {
//     createPoolFluxBeam
//     };
