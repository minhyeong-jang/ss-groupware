import axios from "axios";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export interface PostCheckinParams {
  id: string;
  pw: string;
}
export interface PostCheckinResponse {
  message: string;
}
export const postCheckin = (data: PostCheckinParams) => {
  return axios.post(`${publicRuntimeConfig.API_URL}/checkin`, data);
};
