export interface TokenDetails {
  "Token Name": string;
  Description: string;
  Symbol: string;
  Supply: string;
  Decimals: string;
}

export interface Extensions {
  "Fee %": string;
  "Max Fee": string;
  "Interest Rate": string;
  "Account State": string;
  "Permanent Delegate": string;
  "Non Transferable": string;
}

export type PreviewData = any;

export interface SidebarItem {
  label: string;
  description: string;
  icon?: string;
  activeIcon?: string;
  children?: SidebarItem[];
  navigateTo?: string;
  disabled?: boolean;
}

export interface HeaderItem {
  title: string;
  navigateTo: string;
  disabled?: boolean;
}

/** a string of readless charateries (like: base64 string)  */
export type HexAddress = string;

export type DateInfo = string | number | Date;

export type MayFunction<T, Params extends any[] = []> =
  | T
  | ((...params: Params) => T);
export type MayPromise<T> = T | Promise<T>;
export type MayArray<T> = T | T[];
export type DeMayArray<T extends MayArray<any>> = T extends any[]
  ? T[number]
  : T;

export interface TxHistoryInfo {
  txid: HexAddress;
  relativeTxids?: HexAddress[];
  title?: string;
  // FORCE CODE
  forceConfirmedTitle?: string;
  // FORCE CODE
  forceErrorTitle?: string;
  block?: number;
  description?: string;
  adapterName?: string;
  isMulti?: boolean;
  /** only for multi-mode (isMulti should be true) */
  subtransactionDescription?: string;
  status: "success" | "droped" | "pending" | "fail";
  time: DateInfo;
}
