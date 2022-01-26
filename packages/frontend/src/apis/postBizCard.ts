import axios from "axios";
import getConfig from "next/config";
import { UserInfoSchema } from "schema";
const { publicRuntimeConfig } = getConfig();

export interface PostBizCardParams {
  userInfo: UserInfoSchema;
  items: {
    syncId: string;
    note: string;
    type: string;
    authSeq: string;
    empSeq: string;
  }[];
}
export interface PostBizCardResponse {
  message: string;
}
export const postBizCard = (data: PostBizCardParams) => {
  return axios.post(`${publicRuntimeConfig.API_URL}/bizcard/submit`, data);
};
