"use client";
import { LocalStorageVariables } from "@/constants/appStorageVars";
import { AppENVConfig } from "@/global/config/config";
import Cookies from "universal-cookie";

export const getServiceApiUrl = () => {
  return AppENVConfig.service_api_url;
};

export const setLocalAccessToken = (accessToken: string) => {
  localStorage.setItem(
    LocalStorageVariables.accessToken,
    JSON.stringify(accessToken)
  );
};

export const getLocalAccessToken = () => {
  const stringfiedData = localStorage.getItem(
    LocalStorageVariables.accessToken
  );
  const data = stringfiedData ? JSON.parse(stringfiedData || "") : "";
  return data;
};
export const setLocalSessionId = (sessionId: string) => {
  localStorage.setItem(
    LocalStorageVariables.sessionId,
    JSON.stringify(sessionId)
  );
};

export const getLocalSessionId = () => {
  const stringfiedData = localStorage.getItem(LocalStorageVariables.sessionId);
  const data = stringfiedData ? JSON.parse(stringfiedData || "") : "";
  return data;
};
export const setLocalGUID = (guid: string) => {
  localStorage.setItem(LocalStorageVariables.guid, JSON.stringify(guid));
};

export const getLocalGUID = () => {
  const stringfiedData = localStorage.getItem(LocalStorageVariables.guid);
  const data = stringfiedData ? JSON.parse(stringfiedData || "") : "";
  return data;
};

export const getVariableFromLocalStorage = (key: string) => {
  const stringfiedData = localStorage.getItem(key);
  const data = stringfiedData ? JSON.parse(stringfiedData || "") : "";
  return data;
};
// export const getDataFromCookies = (key: string) => {
//   const cookies = new Cookies();
//   let val = cookies.getAll();
//   console.log(val, "val");
// };
