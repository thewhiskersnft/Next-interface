import { TOKEN_2022_PROGRAM_ID, getTokenMetadata } from "@solana/spl-token";
import {
  Connection,
  GetProgramAccountsFilter,
  PublicKey,
} from "@solana/web3.js";
import axios from "axios";

export const fetchUserToken22Tokens = async (
  wallet: string,
  connection: Connection
) => {
  return getToken22Accounts(wallet, connection);
};
async function getToken22Accounts(wallet: string, connection: Connection) {
  try {
    const filters = [
      {
        dataSize: 182, //size of account (bytes)
      },
      {
        memcmp: {
          offset: 32, //location of our query in the account (bytes)
          bytes: wallet, //our search criteria, a base58 encoded string
        },
      },
      { memcmp: { offset: 165, bytes: "3" } }, // AccountType::Account
    ];

    const programAccountsConfig = {
      filters,
      encoding: "jsonParsed" as const,
    };

    const accounts = await connection.getParsedProgramAccounts(
      TOKEN_2022_PROGRAM_ID,
      programAccountsConfig
    );

    const res_data = [];
    for (var i = 0; i < accounts.length; i++) {
      const account = accounts[i];
      //Parse the account data
      const parsedAccountInfo: any = account.account.data;
      const mintAddress: string = parsedAccountInfo["parsed"]["info"]["mint"];
      const tokenBalance: number =
        parsedAccountInfo["parsed"]["info"]["tokenAmount"]["uiAmount"];
      const tokenDecimal: number =
        parsedAccountInfo["parsed"]["info"]["tokenAmount"]["decimals"];

      // Retrieve and log the metadata state
      const metadata = await getTokenMetadata(
        connection,
        new PublicKey(mintAddress) // Mint Account address
      );
      if (metadata) {
        const response = await axios.get(metadata.uri);
        if (response.status) {
          const data = response.data;
          res_data.push({
            ...data,
            mint: mintAddress,
            decimal: tokenDecimal,
            amount: tokenBalance,
            isToken22: true,
          });
        }
      }
    }
    return res_data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
