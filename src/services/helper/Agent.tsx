import axios from "axios";
import authService from "../authService";
import { get } from "lodash";
import { clearLocalStorageForLogout, isSignedIn } from "@/utils/auth/checkAuth";
import { errorToast } from "@/component/common/toast";
import { API_METHODS } from "@/constants";

interface RefreshAccessTokenCallbackResp {
  accessToken: string;
  userGUID: string;
  sessionId: string;
}

const refreshTokenCallback = async ({
  url,
  dataObject,
  cache,
  axiosConfig,
  method,
}: any) => {
  switch (method) {
    case API_METHODS.POST:
      const postResp = await Post(url, dataObject, cache ? cache : false, {
        ...axiosConfig,
      });
      return postResp;
    case API_METHODS.GET:
      const getResp = await Get(url, cache ? cache : false, { ...axiosConfig });
      return getResp;
    default:
      return;
  }
};

const Post = async (
  url: string,
  postObject: any,
  cache?: boolean,
  axiosConfig?: any,
  byPassLoginAuth?: boolean
) => {
  if (!byPassLoginAuth && !isSignedIn()) {
    // errorToast({ message: "Please SignIn!" });
    return;
  }
  return await axios
    .post(url, postObject, axiosConfig)
    .then((postResp: any) => {
      return postResp;
    })
    .catch((postError: any) => {
      if (postError.response.status === 406) {
        // access token expired
        let resp = authService.refreshAccessToken(
          {
            user_guid: get(axiosConfig, "headers.user_guid", ""),
            session_id: get(axiosConfig, "headers.session_id", ""),
          },
          async (props: RefreshAccessTokenCallbackResp) => {
            let updatedAxiosConfig = { ...axiosConfig };
            updatedAxiosConfig["headers"][
              "authorization"
            ] = `Bearer ${props.accessToken}`;
            updatedAxiosConfig["headers"]["session_id"] = props.sessionId;
            updatedAxiosConfig["headers"]["user_guid"] = props.userGUID;
            const resp = await refreshTokenCallback({
              url,
              dataObject: postObject,
              cache,
              axiosConfig: updatedAxiosConfig,
              method: API_METHODS.POST,
            });
            return resp;
          }
        );
      }
      if (postError.response.status === 417) {
        // refresh token expired
        // logout
        errorToast({ message: "Refresh Token Expired, Please Login Again!" });
        clearLocalStorageForLogout();
      }
      return Promise.reject(postError);
    });
};

const Get = async (
  url: string,
  cache?: boolean,
  axiosConfig?: any,
  byPassLoginAuth?: boolean
) => {
  if (!byPassLoginAuth && !isSignedIn()) {
    // errorToast({ message: "Please SignIn!" });
    return;
  }
  return await axios
    .get(url, axiosConfig)
    .then((getResp: any) => {
      return getResp;
    })
    .catch(async (getError: any) => {
      if (getError.response.status === 406) {
        // access token expired
        let refreshTokenResp = await authService.refreshAccessToken(
          {
            user_guid: get(axiosConfig, "headers.user_guid", ""),
            session_id: get(axiosConfig, "headers.session_id", ""),
          },
          async (props: RefreshAccessTokenCallbackResp) => {
            let updatedAxiosConfig = { ...axiosConfig };
            updatedAxiosConfig["headers"][
              "authorization"
            ] = `Bearer ${props.accessToken}`;
            updatedAxiosConfig["headers"]["session_id"] = props.sessionId;
            updatedAxiosConfig["headers"]["user_guid"] = props.userGUID;
            const resp = await refreshTokenCallback({
              url,
              dataObject: {},
              cache,
              axiosConfig: updatedAxiosConfig,
              method: API_METHODS.GET,
            });
            return resp;
          }
        );
      }
      if (getError.response.status === 417) {
        // refresh token expired
        // logout
        errorToast({ message: "Refresh Token Expired, Please Login Again!" });
        clearLocalStorageForLogout();
      }
      return Promise.reject(getError);
    });
};

export { Get, Post };
