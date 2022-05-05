import axios from "axios";
import getConfig from "next/config";
import { UserInfoSchema } from "schema";
const { publicRuntimeConfig } = getConfig();

export interface PostUserLoginParams extends UserInfoSchema {}
export interface PostUserLoginResponse {
  message: string;
}
export const postUserLogin = (data: PostUserLoginParams) => {
  return axios.post(`${publicRuntimeConfig.API_URL}/login`, data);
};
