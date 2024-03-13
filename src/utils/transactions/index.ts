import { errorToast, successToast } from "@/component/toast";

export async function recursiveCheckTransitionStatus(
  startTime: any,
  txHash: any,
  connection: any,
  wallet: any,
  // mint_account: any
) {
  return new Promise((resolve: any, reject: any) => {
    try {
      connection
        .getSignatureStatus(txHash, { searchTransactionHistory: true })
        .then(async (res: any) => {
          console.log(res);
          if (res?.value?.confirmationStatus === "finalized") {
            console.log("if : ", res);
            // successToast({
            //   keyPairs: {
            //     mintAddress: {
            //       value: `${mint_account}`,
            //       linkTo: `https://solscan.io/token/${mint_account}?cluster=devnet`,
            //     },
            //     signature: {
            //       value: `${txHash}`,
            //       linkTo: `https://solscan.io/tx/${txHash}?cluster=devnet`,
            //     },
            //   },
            //   allowCopy: true,
            // });
            resolve(true);
          } else if (res?.value?.confirmationStatus === "confirmed") {
            console.log("else if confirmed : ", res);
            resolve(true);
          } else if (
            (res?.value?.confirmationStatus === "pending" ||
              res?.value?.confirmationStatus === "processed" ||
              res.value === null) &&
            Date.now() - startTime < 30000 // 30sec
          ) {
            console.log("else if : ", res);
            setTimeout(async () => {
              let resp = await recursiveCheckTransitionStatus(
                startTime,
                txHash,
                connection,
                wallet,
                // mint_account
              );
              resolve(resp);
            }, 3000); // 3sec
          } else {
            console.log("else");
            errorToast({
              message: "Please try again. Try adding priority fee.",
            });
            resolve(false);
          }
        });
    } catch (e) {
      console.log("error : ", e);
      reject(e);
    }
  });
}
