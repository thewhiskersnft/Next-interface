import { AppENVConfig } from "../config/config";

export const getConnectedClusterInfo = () => {
  return AppENVConfig.connected_cluster;
};

export const isMainnet = () => {
  return getConnectedClusterInfo() === "production";
};
