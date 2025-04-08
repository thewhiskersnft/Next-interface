import {
  getLocalAccessToken,
  getLocalGUID,
  getLocalSessionId,
  getLocalWalletAddress,
  setLocalAccessToken,
  setLocalGUID,
  setLocalSessionId,
  setLocalWalletAddress,
} from "../apiService";

export const isSignedIn = () => {
  const accessToken = getLocalAccessToken();
  const guid = getLocalGUID();
  const sessionId = getLocalSessionId();
  const walletAddress = getLocalWalletAddress();
  if (accessToken && guid && sessionId && walletAddress) {
    return true;
  }
  return false;
};

export const clearLocalStorageForLogout = () => {
  setLocalAccessToken("");
  setLocalGUID("");
  setLocalSessionId("");
  setLocalWalletAddress("");
};
