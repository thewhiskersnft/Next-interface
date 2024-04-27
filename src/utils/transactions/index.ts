import { errorToast, successToast } from "@/component/common/toast";

export async function recursiveCheckTransitionStatus(
  startTime: any,
  txHash: any,
  connection: any,
  wallet?: any
) {
  return new Promise((resolve: any, reject: any) => {
    try {
      connection
        .getSignatureStatus(txHash, { searchTransactionHistory: true })
        .then(async (res: any) => {
          if (res?.value?.confirmationStatus === "finalized") {
            resolve(true);
          } else if (res?.value?.confirmationStatus === "confirmed") {
            resolve(true);
          } else if (
            (res?.value?.confirmationStatus === "pending" ||
              res?.value?.confirmationStatus === "processed" ||
              res.value === null) &&
            Date.now() - startTime < 30000 // 30sec
          ) {
            setTimeout(async () => {
              let resp = await recursiveCheckTransitionStatus(
                startTime,
                txHash,
                connection,
                wallet
              );
              resolve(resp);
            }, 3000); // 3sec
          } else {
            errorToast({
              message: "Network Is Conjested, Try Adding More Priority Fee.",
            });
            resolve(false);
          }
        });
    } catch (e) {
      console.warn("error : ", e);
      reject(e);
    }
  });
}
