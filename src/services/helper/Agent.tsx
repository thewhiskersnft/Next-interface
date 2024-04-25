import axios from "axios";
import authService from "../authService";
import { get } from "lodash";

const Post = async (
  url: string,
  postObject: any,
  cache?: boolean,
  axiosConfig?: any
) => {
  return await axios
    .post(url, postObject, axiosConfig)
    .then((postResp: any) => {
      return postResp;
    })
    .catch((postError: any) => {
      return Promise.reject(postError);
    });
};

const Get = async (url: string, cache?: boolean, axiosConfig?: any) => {
  return await axios
    .get(url, axiosConfig)
    .then((getResp: any) => {
      console.log("Get resp : ", getResp);
      return getResp;
    })
    .catch((getError: any) => {
      console.log("Get err : ", getError);
      if (getError.response.status === 406) {
        let resp = authService.refreshAccessToken({
          userGuid: get(axiosConfig, "headers.user_guid", ""),
          sessionId: get(axiosConfig, "headers.session_id", ""),
        });
        console.log("Response ::::: 12345 ", resp);
      }
      return Promise.reject(getError);
    });
};

export { Get, Post };
