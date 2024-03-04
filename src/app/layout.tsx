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

// export const metadata: Metadata = {
//   title: "Moonly",
//   description: "Moonly",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <Provider store={store}>
//         <body className={inter.className}>{children}</body>
//       </Provider>
//     </html>
//   );
// }

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
      {/* <SolanaWalletAdapter>
        <ReduxProvider>
          <ToastContainer /> */}
      <body className={inter.className}>
        {<ProviderChild>{children}</ProviderChild>}
      </body>
      {/* </ReduxProvider>
      </SolanaWalletAdapter> */}
    </html>
  );
}
