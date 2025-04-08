import { getMint } from "@solana/spl-token";
import { Connection, PublicKey } from "@solana/web3.js";

export const validateAddress = async (
  connection: Connection,
  tokenMint: PublicKey
) => {
  try {
    const mintAccount = await getMint(connection, tokenMint);
    return mintAccount;
  } catch (e) {}
};
