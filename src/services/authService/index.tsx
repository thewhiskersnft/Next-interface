import {
  getServiceApiUrl,
  setLocalAccessToken,
  setLocalGUID,
  setLocalSessionId,
} from "@/utils/apiService";
import { Post } from "../helper/Agent";
import { AUTH_API_PATH } from "@/constants/apiURLs";
import { get } from "lodash";

class AuthService {
  loginMessage = async (data: any) => {
    const URL = getServiceApiUrl() + AUTH_API_PATH.LOGIN_MESSAGE;
    const resp = await Post(URL, data);
    return resp;
  };

  login = async (data: Object) => {
    const URL = getServiceApiUrl() + AUTH_API_PATH.LOGIN;
    const resp = await Post(URL, data, false, { withCredentials: true });
    if (resp) {
      // const cookies = resp.headers["set-cookie"];
      // console.log(cookies, "cookies");
      const accessToken = get(resp, "data.access_token", "");
      const userGUID = get(resp, "data.user_guid", "");
      const sessionId = get(data, "session_id", "");
      setLocalAccessToken(accessToken);
      setLocalSessionId(sessionId);
      setLocalGUID(userGUID);
    }
    return resp;
  };

  refreshAccessToken = async (data: Object) => {
    const URL = getServiceApiUrl() + AUTH_API_PATH.REFRESH_ACCESS_TOKEN;
    const resp = await Post(URL, data, false, { withCredentials: true });
    console.log(resp, "Response for refresh token");
    const accessToken = get(resp, "data.token", "");
    const userGUID = get(resp, "data.user_guid", "");
    const sessionId = get(resp, "data.session_id", "");
    setLocalAccessToken(accessToken);
    setLocalSessionId(sessionId);
    setLocalGUID(userGUID);
  };
}

export default new AuthService();
