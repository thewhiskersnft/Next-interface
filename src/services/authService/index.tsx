import { getServiceApiUrl } from "@/utils/apiService";
import { Post } from "../helper/Agent";
import { AUTH_API_PATH } from "@/constants/apiURLs";

class AuthService {
  loginMessage = async (data: any) => {
    const URL = getServiceApiUrl() + AUTH_API_PATH.LOGIN_MESSAGE;
    return await Post(URL, data);
  };

  login = async (data: Object) => {
    const URL = getServiceApiUrl() + AUTH_API_PATH.LOGIN;
    return await Post(URL, data);
  };
}

export default new AuthService();
