import {
  ENDPOINT as _ENDPOINT,
  Currency,
  DEVNET_PROGRAM_ID,
  LOOKUP_TABLE_CACHE,
  MAINNET_PROGRAM_ID,
  RAYDIUM_MAINNET,
  Token,
  TOKEN_PROGRAM_ID,
  TxVersion,
  NativeTokenInfo,
  SOL,
} from "@raydium-io/raydium-sdk";

export const PROGRAMIDS = DEVNET_PROGRAM_ID;

export const ENDPOINT = _ENDPOINT;

export const RAYDIUM_MAINNET_API = RAYDIUM_MAINNET;

export const makeTxVersion = TxVersion.V0; // LEGACY

export const addLookupTableInfo = undefined; // only mainnet. other = undefined

//  ------------- 2.77 : SOL MarketID Creation Fees -------------------
// const marketBytesData: MarketBytesData = {
//   eventQueueBytes: 262144 + 12,
//   requestQueueBytes: 5128 + 12,
//   OrderbookBytes: 65536 + 12,
// }

//  ------------- 0.323 : SOL MarketID Creation Fees -------------------
// const marketBytesData: MarketBytesData = {
//   eventQueueBytes: 11308,
//   requestQueueBytes: 5084,
//   OrderbookBytes: 14524,
// }

//  ------------- 1.36 : SOL MarketID Creation Fees -------------------
// const marketBytesData: MarketBytesData = {
//   eventQueueBytes: 123244,
//   requestQueueBytes: 5084,
//   OrderbookBytes: 32452,
// }

type MarketBytesData = {
  eventQueueBytes: number;
  requestQueueBytes: number;
  OrderbookBytes: number;
};

const marketBytesData: MarketBytesData[] = [
  {
    eventQueueBytes: 11308,
    requestQueueBytes: 5128 + 12,
    OrderbookBytes: 14524,
  },
  {
    eventQueueBytes: 123244,
    requestQueueBytes: 5128 + 12,
    OrderbookBytes: 32452,
  },
  {
    eventQueueBytes: 262144 + 12,
    requestQueueBytes: 5128 + 12,
    OrderbookBytes: 65536 + 12,
  },
];

export const desiredMarketIdConfig = (type: number) => {
  switch (type) {
    case 1: // 0.4 SOL Fee
      return marketBytesData[0];
    case 2: // 1.5 SOL Fee\
      return marketBytesData[1];
    case 3: // 2.8 SOL Fee
      return marketBytesData[2];
  }
};
