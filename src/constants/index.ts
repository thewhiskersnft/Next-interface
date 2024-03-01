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
    description: "Create and manage your own SPL (v1/v2) Tokens",
    icon: "/tokenManagement.png",
    activeIcon: "/tokenManagementActive.png",
    children: [
      {
        label: "Create Token",
        description:
          "Design & Deploy your own v1 ( legacy ) or v2 ( Token-22) SPL tokens with Extensions",
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
      },
      {
        label: "Get Token Verified",
        description:
          "Verify to Get listed on jupiter strict list & solana wallets",
        navigateTo: `/token?action=${TokenRoutes.verifyToken}`,
      },
      {
        label: "Mint Tokens",
        description: "Mint more tokens using an existing token mint",
        navigateTo: `/token?action=${TokenRoutes.mintToken}`,
      },
      {
        label: "Burn Tokens",
        description: "Burn tokens from your wallet",
        navigateTo: `/token?action=${TokenRoutes.burnToken}`,
      },
    ],
  },
  {
    label: "Manage Liquidity",
    description: "Create & Manage OpenBook Market IDs & Liquidity Pools",
    icon: "/manageLiquidity.png",
    activeIcon: "/manageLiquidityActive.png",
    children: [
      {
        label: "Create Open Book Market ID",
        description: "Create Openbook Market ID to Set Up Liquidity Pool",
      },
      {
        label: "Create Raydium Liquidity Pool (LP)",
        description: "Create a Raydium LP",
      },
      {
        label: "Fund Liquidity Pool",
        description: "Fund An Existing Liquidity Pool",
      },
      {
        label: "Renounce LP (Burn LP)",
        description: "Renounce Your LP Ownership Token",
      },
    ],
  },
  {
    label: "Creator Tools",
    description: "Manage Airdrops, Team Vesting Contracts & More",
    icon: "/creatorTools.png",
    activeIcon: "/creatorToolsActive.png",
    children: [
      {
        label: "Snapshot Holders",
        description: "Snapshot Holder List For NFTs& SPL Tokens",
      },
      {
        label: "Send Airdrops",
        description: "Send Bulk Airdrops To Solana Wallets",
      },
      {
        label: "Create Airdrop Claim Contracts",
        description:
          "Create An Airdrop Claim Contrect To Distribute Your Tokens",
      },
      {
        label: "Create Vesting Contracts",
        description: "Manage Vesting Of Teams Tokens On Chain",
      },
    ],
  },
  {
    label: "Token Safety (Rug Check)",
    description: "Analyse Token Safety Parameters To Be Safe From Rugs",
    icon: "/tokenSafety.png",
    activeIcon: "/tokenSafetyActive.png",
  },
  {
    label: "Burn To Claim Rent",
    description: "Burn Tokens & NFTs Or Close Vacant Accounts For Rent",
    icon: "/burn.png",
    activeIcon: "/burnActive.png",
  },
  {
    label: "Airdrop Checker",
    description: "Bulk Scan Your Wallets To Determine Airdrop Eligibility",
    icon: "/airdrop.png",
    activeIcon: "/airdropActive.png",
  },
];

export const keyPairs: Record<string, string> = {
  createV1: "createV1",
  createV2: "createV2",
};

export const PLATFORM_OWNER_ADDRESS =
  "Fk1BL4Sq768EZqjVrguSo7C4gPFVGxwthDXuZE8biQpR";
export const PLATFORM_FEE_SOL_TOKEN_CREATION = 0.1;
