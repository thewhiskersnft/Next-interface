export const AppENVConfig = {
  connected_cluster: process.env.NEXT_PUBLIC_ENVIRONMENT
    ? process.env.NEXT_PUBLIC_ENVIRONMENT
    : "dev",
  primary_mainnet_rpc_url: process.env.NEXT_PUBLIC_MAINNET_PRIMARY_RPC_URL
    ? process.env.NEXT_PUBLIC_MAINNET_PRIMARY_RPC_URL
    : "",
  secondary_mainnet_rpc_url: process.env.NEXT_PUBLIC_MAINNET_SECONDARY_RPC_URL
    ? process.env.NEXT_PUBLIC_MAINNET_SECONDARY_RPC_URL
    : "",
  primary_devnet_rpc_url: process.env.NEXT_PUBLIC_DEVNET_PRIMARY_RPC_URL
    ? process.env.NEXT_PUBLIC_DEVNET_PRIMARY_RPC_URL
    : "",
  secondary_devnet_rpc_url: process.env.NEXT_PUBLIC_DEVNET_SECONDARY_RPC_URL
    ? process.env.NEXT_PUBLIC_DEVNET_SECONDARY_RPC_URL
    : "",
  nft_storage_api_key: process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN
    ? process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN
    : "",
  service_api_url: process.env.NEXT_PUBLIC_SERVICE_API_URL
    ? process.env.NEXT_PUBLIC_SERVICE_API_URL
    : "",
};
