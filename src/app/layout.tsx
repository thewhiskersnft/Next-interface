"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store/store";
import { SolanaWalletAdapter } from "@/context/WalletAdapter";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Whiskers",
//   description: "Whiskers",
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
  return <Provider store={store}>{children}</Provider>;
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <SolanaWalletAdapter>
        <ReduxProvider>
          <body className={inter.className}>{children}</body>
        </ReduxProvider>
      </SolanaWalletAdapter>
    </html>
  );
}
