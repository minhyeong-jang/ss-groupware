import axios from "axios";
import getConfig from "next/config";
import { UserInfoSchema } from "schema";
const { publicRuntimeConfig } = getConfig();

export interface PostCheckinParams extends UserInfoSchema {}
export interface PostCheckinResponse {
  message: string;
}
export const postCheckin = (data: PostCheckinParams) => {
  return axios.post(`${publicRuntimeConfig.API_URL}/checkin`, data);
};
