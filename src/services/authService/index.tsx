import {
  getServiceApiUrl,
  setLocalAccessToken,
  setLocalGUID,
  setLocalSessionId,
  setLocalWalletAddress,
} from "@/utils/apiService";
import { Post } from "../helper/Agent";
import { AUTH_API_PATH } from "@/constants/apiURLs";
import { get } from "lodash";
import { clearLocalStorageForLogout } from "@/utils/auth/checkAuth";
import { EVENTS } from "@/constants/eventListeners";

class AuthService {
  loginMessage = async (data: any) => {
    const URL = getServiceApiUrl() + AUTH_API_PATH.LOGIN_MESSAGE;
    const resp = await Post(URL, data, false, {}, true);
    return resp;
  };

  login = async (data: Object, walletAddress: string) => {
    if (!walletAddress) {
      console.warn("Wallet not connected!");
      return;
    }
    const URL = getServiceApiUrl() + AUTH_API_PATH.LOGIN;
    const resp = await Post(URL, data, false, { withCredentials: true }, true);
    if (resp) {
      const accessToken = get(resp, "data.access_token", "");
      const userGUID = get(resp, "data.user_guid", "");
      const sessionId = get(data, "session_id", "");
      setLocalAccessToken(accessToken);
      setLocalSessionId(sessionId);
      setLocalGUID(userGUID);
      setLocalWalletAddress(walletAddress);
      const fetchPointsEvents = new CustomEvent(EVENTS.GET_REWARD_POINTS);
      window?.dispatchEvent(fetchPointsEvents);
    }
    return resp;
  };

  refreshAccessToken = async (data: Object, callBackFunction: any) => {
    const URL = getServiceApiUrl() + AUTH_API_PATH.REFRESH_ACCESS_TOKEN;
    const resp = await Post(URL, data, false, { withCredentials: true });
    if (resp.status) {
      const accessToken = get(resp, "data.access_token", "");
      const userGUID = get(resp, "data.user_guid", "");
      const sessionId = get(resp, "data.session_id", "");
      setLocalAccessToken(accessToken);
      setLocalSessionId(sessionId);
      setLocalGUID(userGUID);
      if (callBackFunction) {
        callBackFunction({
          accessToken,
          userGUID,
          sessionId,
        });
      }
    }
    return resp.status;
  };

  logout = async (data: Object) => {
    const URL = getServiceApiUrl() + AUTH_API_PATH.LOGOUT;
    const resp = await Post(URL, data, false, { withCredentials: true });
    if (resp) {
      clearLocalStorageForLogout();
    }
    return resp;
  };
}

export default new AuthService();
