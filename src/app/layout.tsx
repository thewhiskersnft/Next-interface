"use client";
//@ts-nocheck
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
// @ts-ignore
import { store } from "@/redux/store/store";
import { SolanaWalletAdapter } from "@/context/WalletAdapter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

type ReduxProviderProps = {
  children: React.ReactNode;
};

function ReduxProvider({ children }: ReduxProviderProps) {
  return (
    <SolanaWalletAdapter>
      <ToastContainer style={{ width: "max-content" }} />
      {/* 
// @ts-ignore */}
      <Provider store={store}>{children}</Provider>
    </SolanaWalletAdapter>
  );
}
function ProviderChild({ children }: any) {
  return <ReduxProvider>{children}</ReduxProvider>;
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
