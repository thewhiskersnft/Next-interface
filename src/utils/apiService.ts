import { AppENVConfig } from "@/global/config/config";

export const getServiceApiUrl = () => {
  return AppENVConfig.service_api_url;
};

// export const setLocalAccessToken = (accessToken: string) => {
//   localStorage.setItem;
// };
