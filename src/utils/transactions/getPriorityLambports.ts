import { ComputeBudgetProgram } from "@solana/web3.js";

export const getPriorityLambports = (fees: number) => {
  const PRIORITY_FEE_IX = ComputeBudgetProgram.setComputeUnitPrice({
    microLamports: 300,
  });
  return PRIORITY_FEE_IX;
};
