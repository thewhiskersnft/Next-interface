// "use client";
// import React, { FC, useMemo } from "react";
// import {
//   ConnectionProvider,
//   WalletProvider,
// } from "@solana/wallet-adapter-react";
// import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
// import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
// import {
//   WalletModalProvider,
//   WalletDisconnectButton,
//   WalletMultiButton,
// } from "@solana/wallet-adapter-react-ui";
// import { clusterApiUrl } from "@solana/web3.js";
// import { isMainnet } from "@/global/hook/getConnectedClusterInfo";
// import { AppENVConfig } from "@/global/config/config";

// // Default styles that can be overridden by your app
// require("@solana/wallet-adapter-react-ui/styles.css");

// interface WalletProps {
//   children: React.ReactNode;
// }

// export const SolanaWalletAdapter: FC<WalletProps> = ({ children }) => {
//   // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
//   const network = isMainnet()
//     ? WalletAdapterNetwork.Mainnet
//     : WalletAdapterNetwork.Devnet;

//   // You can also provide a custom RPC endpoint.
//   const endpoint = useMemo(
//     () =>
//       isMainnet()
//         ? AppENVConfig.primary_mainnet_rpc_url // update RPC here (speed)
//         : clusterApiUrl(network),
//     [network]
//   );

//   const wallets = useMemo(
//     () => [
//       /**
//        * Wallets that implement either of these standards will be available automatically.
//        *
//        *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
//        *     (https://github.com/solana-mobile/mobile-wallet-adapter)
//        *   - Solana Wallet Standard
//        *     (https://github.com/solana-labs/wallet-standard)
//        *
//        * If you wish to support a wallet that supports neither of those standards,
//        * instantiate its legacy wallet adapter here. Common legacy adapters can be found
//        * in the npm package `@solana/wallet-adapter-wallets`.
//        */
//       new PhantomWalletAdapter(),
//     ],
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [network]
//   );

//   return (
//     <ConnectionProvider endpoint={endpoint}>
//       <WalletProvider wallets={wallets} autoConnect>
//         <WalletModalProvider>
//           {/* <WalletMultiButton />
//           <WalletDisconnectButton /> */}
//           {children}
//         </WalletModalProvider>
//       </WalletProvider>
//     </ConnectionProvider>
//   );
// };

import React, { ReactNode, useCallback, useMemo } from "react";
// import { useRouter } from "next/router";

import {
  WalletAdapterNetwork,
  WalletError,
  Adapter,
} from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  // BackpackWalletAdapter,
  BitKeepWalletAdapter,
  BitpieWalletAdapter,
  // BraveWalletAdapter,
  CloverWalletAdapter,
  Coin98WalletAdapter,
  CoinbaseWalletAdapter,
  CoinhubWalletAdapter,
  // ExodusWalletAdapter,
  // GlowWalletAdapter,
  LedgerWalletAdapter,
  MathWalletAdapter,
  PhantomWalletAdapter,
  SafePalWalletAdapter,
  // SlopeWalletAdapter,
  // SolletExtensionWalletAdapter,
  // SolletWalletAdapter,
  SolongWalletAdapter,
  TokenPocketWalletAdapter,
  TorusWalletAdapter,
  TrustWalletAdapter,
  WalletConnectWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
  SolflareWalletAdapter,
  initialize,
} from "@solflare-wallet/wallet-adapter";
// import SquadsEmbeddedWalletAdapter, { detectEmbeddedInSquadsIframe } from './SquadsMultisig'
import { clusterApiUrl } from "@solana/web3.js";
import { useSelector } from "react-redux";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
// import { OKXWalletAdapter } from './OKXAdapter'

// import useAppSettings from "@/application/common/useAppSettings";
// import useConnection from "@/application/connection/useConnection"; // take from redux store
// import useWallet from "@/application/wallet/useWallet";
// import { isInLocalhost } from "@/functions/judgers/isSSR";

/** include: SolanaWalletConnectionProvider SolanaWalletAdaptorsProvider SolanaWalletModalProvider */
export function SolanaWalletProviders({ children }: { children?: ReactNode }) {
  const needPopDisclaimer = false;
  // Set to 'devnet' | 'testnet' | 'mainnet-beta' or provide a custom RPC endpoint
  // const { currentEndPoint, isLoading } = useConnection();

  // const { pathname } = useRouter();
  const { currentEndpoint, isConnectionLoading } = useSelector(
    (state: any) => state.connectionDataSlice
  );

  const endpoint = useMemo(
    () => currentEndpoint ?? clusterApiUrl("devnet"),
    [currentEndpoint]
  );

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      // new OKXWalletAdapter(),
      new TrustWalletAdapter(),
      ...(typeof window === "undefined" ? [] : [new SolflareWalletAdapter()]),
      // new SolletWalletAdapter(),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
      // new SolletExtensionWalletAdapter(),
      new MathWalletAdapter({ endpoint }),
      new TokenPocketWalletAdapter(),
      new CoinbaseWalletAdapter({ endpoint }),
      new SolongWalletAdapter({ endpoint }),
      new Coin98WalletAdapter({ endpoint }),
      new SafePalWalletAdapter({ endpoint }),
      // new SlopeWalletAdapter({ endpoint }),
      new BitpieWalletAdapter({ endpoint }),
      // new GlowWalletAdapter(),
      // new BitKeepWalletAdapter({ endpoint }),
      // new ExodusWalletAdapter({ endpoint }),
      new CloverWalletAdapter(),
      new CoinhubWalletAdapter(),
      // new BackpackWalletAdapter(),
      // new WalletConnectWalletAdapter({
      //   network: WalletAdapterNetwork.Mainnet, // const only, cannot use condition to use dev/main, guess is relative to walletconnect connection init
      //   options: {
      //     projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PJ_ID,
      //     metadata: {
      //       name: "Raydium",
      //       description: "Raydium",
      //       url: "https://raydium.io/",
      //       icons: ["https://raydium.io/logo/logo-only-icon.svg"],
      //     },
      //   },
      // }),
      // new BraveWalletAdapter(),
      // ...(detectEmbeddedInSquadsIframe() ? [new SquadsEmbeddedWalletAdapter()] : [])
    ],
    [endpoint]
  );

  // const onError = useCallback((err: WalletError, adapter?: Adapter) => {
  //   // in local will throw disconnect error when hot-reload, might be phantom or wallet adapter'bug
  //   if (isInLocalhost && adapter && err.name === "WalletDisconnectedError") {
  //     if (useWallet.getState().userDisconnect) {
  //       useWallet.setState({ userDisconnect: false });
  //       return;
  //     }
  //     setTimeout(() => {
  //       useWallet.getState().select(adapter.name);
  //     }, 100);
  //   }
  // }, []);

  return (
    <ConnectionProvider
      endpoint={endpoint}
      config={{ disableRetryOnRateLimit: true }}
    >
      <WalletProvider
        wallets={wallets}
        onError={(e) => {
          console.warn(e, "------------------");
        }}
        autoConnect={
          // pathname !== "/" &&
          // needPopDisclaimer === false &&
          // (!isConnectionLoading || !!currentEndPoint)
          true
        }
      >
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
