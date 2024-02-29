import {
  irysStorage,
  Metaplex,
  walletAdapterIdentity,
} from "@metaplex-foundation/js";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
// Mainnet Bundlr address, uncomment if using mainnet
// const BUNDLR_ADDRESS = "https://node1.bundlr.network"
export const metaplexBuilder = async (
  wallet: WalletContextState,
  solanaConnection: Connection
) => {
  const metaplex = Metaplex.make(solanaConnection)
    .use(walletAdapterIdentity(wallet))
    .use(
      irysStorage({
        address: "https://devnet.bundlr.network",
        timeout: 60000,
      })
    );
  return metaplex;
};
