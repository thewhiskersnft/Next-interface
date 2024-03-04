import { SidebarItem } from "../interfaces";

export const TokenRoutes: Record<string, string> = {
  createToken: "create-token",
  manageToken: "manage-token",
  updateMetadata: "update-metadata",
  verifyToken: "verify-token",
  mintToken: "mint-token",
  burnToken: "burn-token",
};

export const sidebarData: SidebarItem[] = [
  {
    label: "Token Management",
    description: "Create & Manage SPL ( v1/v2 ) Tokens",
    icon: "/tokenManagement.svg",
    activeIcon: "/tokenManagementActive.svg",
    children: [
      {
        label: "Create Token",
        description:
          "Design & Deploy v1 ( Legacy ) Or v2 ( Token-22 ) SPL Tokens With Extensions",
        navigateTo: `/token?action=${TokenRoutes.createToken}`,
      },
      {
        label: "Manage Token",
        description: "Manage Token Ownership & Update Authorities",
        navigateTo: `/token?action=${TokenRoutes.manageToken}`,
      },
      {
        label: "Update Metadata",
        description: "Update Token Metadata",
        navigateTo: `/token?action=${TokenRoutes.updateMetadata}`,
        disabled: true,
      },
      {
        label: "Get Token Verified",
        description: "Get Verified On Jupiter Strict List & Solana Wallets",
        navigateTo: `/token?action=${TokenRoutes.verifyToken}`,
        disabled: true,
      },
      {
        label: "Mint Tokens",
        description: "Mint More Tokens Using An Existing Token Mint",
        navigateTo: `/token?action=${TokenRoutes.mintToken}`,
      },
      {
        label: "Burn Tokens",
        description: "Burn Tokens From Your Wallet",
        navigateTo: `/token?action=${TokenRoutes.burnToken}`,
      },
    ],
  },
  {
    label: "Manage Liquidity",
    description: "Create & Manage Openbook Market IDs & Liquidity Pools",
    icon: "/manageLiquidity.svg",
    activeIcon: "/manageLiquidityActive.svg",
    // disabled: true,
    children: [
      {
        label: "Create Openbook Market ID",
        description: "Create Openbook Market ID To Set Up Liquidity Pool",
        disabled: true,
      },
      {
        label: "Create Raydium Liquidity Pool (LP)",
        description: "Create a Raydium LP",
        disabled: true,
      },
      {
        label: "Fund Liquidity Pool",
        description: "Fund An Existing Liquidity Pool",
        disabled: true,
      },
      {
        label: "Renounce LP (Burn LP)",
        description: "Renounce Your LP Ownership Tokens",
        disabled: true,
      },
    ],
  },
  {
    label: "Creator Tools",
    description: "Manage Airdrops, Team Vesting Contracts & More",
    icon: "/creatorTools.svg",
    activeIcon: "/creatorToolsActive.svg",
    children: [
      {
        label: "Snapshot Holders",
        description: "Snapshot Holder List For NFTs & SPL Tokens",
        disabled: true,
      },
      {
        label: "Send Airdrops",
        description: "Send Bulk Airdrops To Solana Wallets",
        disabled: true,
      },
      {
        label: "Create Airdrop Claim Contracts",
        description:
          "Create An Airdrop Claim Contrect To Distribute Your Tokens",
        disabled: true,
      },
      {
        label: "Create Vesting Contracts",
        description: "Manage Vesting Of Teams Tokens On Chain",
        disabled: true,
      },
    ],
  },
  {
    label: "Token Safety (Rug Check)",
    description: "Analyse Token Safety Parameters To Be Safe From Rugs",
    icon: "/tokenSafety.svg",
    activeIcon: "/tokenSafetyActive.svg",
    disabled: true,
  },
  {
    label: "Burn To Claim Rent",
    description: "Burn Tokens & NFTs Or Close Vacant Accounts For Rent",
    icon: "/burn.svg",
    activeIcon: "/burnActive.svg",
    disabled: true,
  },
  {
    label: "Airdrop Checker",
    description: "Bulk Scan Your Wallets To Determine Airdrop Eligibility",
    icon: "/airdrop.svg",
    activeIcon: "/airdropActive.svg",
    disabled: true,
  },
];

export const keyPairs: Record<string, string> = {
  createV1: "createV1",
  createV2: "createV2",
};

export const PLATFORM_OWNER_ADDRESS =
  "AZLF3pWCpjh93yJo74hzKJWmiQrfv1hVAZ7wq4DA5x1d";
export const PLATFORM_FEE_SOL_TOKEN_CREATION = 0.0100;
