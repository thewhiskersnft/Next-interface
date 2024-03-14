import { isMainnet } from "@/global/hook/getConnectedClusterInfo";

export const getSignatureURL = (sig: string) => {
  let res = `https://solscan.io/tx/${sig}${
    isMainnet() ? "" : "?cluster=devnet"
  }`;
  return res;
};

export const getMintURL = (mintAddr: string) => {
  let res = `https://solscan.io/token/${mintAddr}${
    isMainnet() ? "" : "?cluster=devnet"
  }`;
  return res;
};
