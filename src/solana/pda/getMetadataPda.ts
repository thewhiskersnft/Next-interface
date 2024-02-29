import { PublicKey } from "@solana/web3.js";
import { MPL_TOKEN_METADATA_PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";

const mplProgramId = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

export const getMetadataPda = (mint: PublicKey) => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("metadata"), mplProgramId.toBuffer(), mint.toBuffer()],
    mplProgramId
  );
};
