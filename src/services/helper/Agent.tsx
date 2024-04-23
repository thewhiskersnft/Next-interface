import axios from "axios";

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
      return getResp;
    })
    .catch((getError: any) => {
      return Promise.reject(getError);
    });
};

export { Get, Post };
