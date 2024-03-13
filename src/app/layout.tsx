"use client";
//@ts-nocheck
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
// @ts-ignore
import { store } from "@/redux/store/store";
import { SolanaWalletProviders } from "@/context/WalletAdapter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import useInitRefreshTransactionStatus from "@/application/transaction/useInitRefreshTransactionStatus";
// import useSyncTxHistoryWithLocalStorage from "@/application/transaction/useSyncTxHistoryWithLocalStorage";

const inter = Inter({ subsets: ["latin"] });

type ReduxProviderProps = {
  children: React.ReactNode;
};

function WalletProvider({ children }: ReduxProviderProps) {
  return (
    <SolanaWalletProviders>
      <ToastContainer style={{ width: "max-content" }} />
      {/* <ApplicationInitializations /> */}
      {children}
    </SolanaWalletProviders>
  );
}
function ProviderChild({ children }: any) {
  return (
    // @ts-ignore
    <Provider store={store}>
      <WalletProvider>{children}</WalletProvider>
    </Provider>
  );
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <title>Moonly</title>
      <meta
        name="description"
        content="Moonly is a lightning-fast trading dApp with a built in CLI trading bot, Advanced Token Analytics, and Gem Finding tools being built for all the Power Users on Solana."
      />
      <body className={inter.className}>
        {<ProviderChild>{children}</ProviderChild>}
      </body>
    </html>
  );
}

// function ApplicationInitializations() {
//   /********************** txHistory **********************/
//   useInitRefreshTransactionStatus();
//   useSyncTxHistoryWithLocalStorage();

//   return null;
// }
