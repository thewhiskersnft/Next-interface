import { isMainnet } from "@/global/hook/getConnectedClusterInfo";
import { getTokenMetadata } from "@/metaplex/getTokenMetadata";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { WalletContextState } from "@solana/wallet-adapter-react";
import {
  Connection,
  GetProgramAccountsFilter,
  PublicKey,
  PublicKeyInitData,
} from "@solana/web3.js";
import axios from "axios";

export const fetchUserSPLTokens = async (
  wallet: WalletContextState,
  connection: Connection
) => {
  try {
    if (!wallet.publicKey) {
      return;
    }

    const isMain = isMainnet();
    if (isMain) {
      const data = await axios.get(
        `https://api.helius.xyz/v0/addresses/${wallet.publicKey.toBase58()}/balances?api-key=${
          process.env.NEXT_PUBLIC_HELIUS_API_KEY
        }`
      );
      const tokens = data.data.tokens;
      const splTokens = tokens.filter(
        (item: any) => item.decimals > 0 && item.amount > 0
      );

      const renderTokenData: any[] = [];
      for (var i = 0; i < splTokens.length; i++) {
        const mintAddress = splTokens[i].mint;
        const amount = splTokens[i].amount / 10 ** splTokens[i].decimals;
        const rawtokenMetadata = await getTokenMetadata(
          new PublicKey(mintAddress),
          connection
        );
        if (!rawtokenMetadata) {
          continue;
        }
        renderTokenData.push({
          name: rawtokenMetadata?.tokenName,
          symbol: rawtokenMetadata?.tokenSymbol,
          image: rawtokenMetadata?.tokenLogo,
          amount,
          mint: mintAddress,
          decimal: splTokens[i].decimals,
          isToken22: false,
        });
      }
      return renderTokenData;
    } else {
      const data = await axios.get(
        `https://api-devnet.helius.xyz/v0/addresses/${wallet.publicKey.toBase58()}/balances?api-key=${
          process.env.NEXT_PUBLIC_HELIUS_API_KEY
        }`
      );
      // console.log("Data helius : ", data);
      const tokens = data.data.tokens;
      // console.log("Tokens : ", tokens);
      const splTokens = tokens.filter(
        (item: any) => item.decimals > 0 && item.amount > 0
      );

      const renderTokenData: any[] = [];
      for (var i = 0; i < splTokens.length; i++) {
        const mintAddress = splTokens[i].mint;
        const decimal = splTokens[i].decimals;
        const amount = splTokens[i].amount / 10 ** splTokens[i].decimals;
        const rawtokenMetadata = await getTokenMetadata(
          new PublicKey(mintAddress),
          connection //devnet connection
        );
        if (!rawtokenMetadata) {
          continue;
        }
        // console.log("Raw data : ", rawtokenMetadata);
        renderTokenData.push({
          name: rawtokenMetadata?.tokenName,
          symbol: rawtokenMetadata?.tokenSymbol,
          image: rawtokenMetadata?.tokenLogo,
          amount,
          mint: mintAddress,
          decimal: decimal,
          isToken22: false,
        });
      }
      return renderTokenData;
    }
  } catch (error) {
    console.log(error);
  }
};
