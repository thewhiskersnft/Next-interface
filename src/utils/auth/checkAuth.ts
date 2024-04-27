import {
  getLocalAccessToken,
  getLocalGUID,
  getLocalSessionId,
  setLocalAccessToken,
  setLocalGUID,
  setLocalSessionId,
} from "../apiService";

export const isSignedIn = () => {
  const accessToken = getLocalAccessToken();
  const guid = getLocalGUID();
  const sessionId = getLocalSessionId();
  if (accessToken && guid && sessionId) {
    return true;
  }
  return false;
};

export const clearLocalStorageForLogout = () => {
  setLocalAccessToken("");
  setLocalGUID("");
  setLocalSessionId("");
};
