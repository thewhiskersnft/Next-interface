// const axios = require("axios");
// const bs58 = require("bs58");
// const solanaWeb3 = require("@solana/web3.js");
// require("dotenv").config();

// const {
//   Connection,
//   Keypair,
//   Transaction,
//   ComputeBudgetProgram,
//   PublicKey,
//   LAMPORTS_PER_SOL,
//   SystemProgram,
// } = solanaWeb3;

// const connection = new Connection("https://api.mainnet-beta.solana.com"); // make it dyamic

// async function callApi(
//   tokenA, // base token addr
//   tokenAAmount, // base token amt
//   tokenADecimal, // extract from tokenA
//   tokenB, // quote token
//   tokenBAmount, // qupte token amt
//   decimal, // extract from tokenB
//   wallet
// ) {
//   //   const privateKey = bs58.decode(pvtKey);
//   //   const payer = Keypair.fromSecretKey(privateKey);
//   const data = {
//     payer: wallet.publicKey.toString(),
//     token_a: tokenA,
//     token_a_amount: tokenAAmount * 10 ** tokenADecimal,
//     token_b: tokenB,
//     token_b_amount: tokenBAmount * 10 ** decimal,
//   };

//   const headers = {
//     accept: "application/json",
//     "Content-Type": "application/json",
//   };

//   try {
//     const response = await axios.post(
//       "https://api.fluxbeam.xyz/v1/token_pools",
//       data,
//       { headers }
//     );
//     if (response.data && response.data.transaction) {
//       const sig = await signtx(response.data.transaction, wallet);
//       if (sig) {
//         return {
//           success: true,
//           signature: sig,
//           lpPool: response.data.pool,
//           lpMint: response.data.lp_mint,
//         };
//       } else {
//         return { success: false, error: "API did not return a transaction." };
//       }
//     } else {
//       console.error("API did not return a transaction.");
//       return { success: false, error: "API did not return a transaction." };
//     }
//   } catch (error) {
//     console.error("Error calling the API:", error);
//     return { success: false, error: error.message };
//   }
// }

// /**
//  * Signs a raw transaction and sends it to the Solana blockchain.
//  */
// async function signtx(rawTx, senderKeypair) {
//   try {
//     const recoveredTransaction = Transaction.from(Buffer.from(rawTx, "base64"));
//     const PRIORITY_FEE_IX = ComputeBudgetProgram.setComputeUnitPrice({
//       microLamports: process.env.PRIORITY_FEE,
//     });
//     const sentPlatFormfeeInstruction = SystemProgram.transfer({
//       fromPubkey: senderKeypair.publicKey,
//       toPubkey: new PublicKey(""),
//       lamports: 0.000025 * LAMPORTS_PER_SOL,
//     });
//     const createPool = new Transaction().add(
//       //   PRIORITY_FEE_IX,
//       //   sentPlatFormfeeInstruction,
//       recoveredTransaction
//     );
//     let blockhash = (await connection.getLatestBlockhash("finalized"))
//       .blockhash;

//     createPool.recentBlockhash = blockhash;

//     createPool.feePayer = senderKeypair.publicKey;
//     console.log("dsds", Object.entries(senderKeypair));

//     createPool.partialSign(Object.entries(senderKeypair));
//     const txnSignature = await connection.sendRawTransaction(
//       createPool.serialize(),
//       {
//         signers: senderKeypair,
//         skipPreflight: true,
//         preflightCommitment: "finalized",
//       }
//     );
//     console.log("Transaction confirmed", txnSignature);
//     return txnSignature;
//   } catch (error) {
//     console.error("Error sending transaction:", error);
//     throw error;
//   }
// }

// // Example usage
// // callApi(
// //   "So11111111111111111111111111111111111111112", // solana addr
// //   0.001, // solana amt
// //   "28Ck8Mdr1RStJMRvCK5Dv9yk5thonnoubvSrr4vZKhhZ", //
// //   1000,
// //   6,
// //   "4N8EFytEqUWMeJ3tiT39XmmENNQMvbCwFh4bdkySuTWNBgRjBXjJcu4AewKWuGz9Gvq4XJZgZMbibt7UPxMPV84W"
// // )
// //   .then((result) => {
// //     if (result.success) {
// //       console.log("Transaction successful:", result.signature);
// //     } else {
// //       console.error("Transaction failed:", result.error);
// //     }
// //   })
// //   .catch((error) => {
// //     console.error("Unhandled error:", error.message);
// //   });
