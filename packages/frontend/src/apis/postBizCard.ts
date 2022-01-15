import axios from "axios";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export interface PostBizCardParams {
  id: string;
  pw: string;
  items: {
    syncId: string;
    note: string;
    type: string;
  }[];
}
export interface PostBizCardResponse {
  message: string;
}
export const postBizCard = (data: PostBizCardParams) => {
  return axios.post(`${publicRuntimeConfig.API_URL}/bizcard/submit`, data);
};