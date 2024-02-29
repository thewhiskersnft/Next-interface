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
}
