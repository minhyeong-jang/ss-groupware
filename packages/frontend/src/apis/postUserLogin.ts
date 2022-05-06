import getConfig from "next/config";
import { UserInfoSchema } from "schema";
import { baseApi } from "./baseApi";
const { publicRuntimeConfig } = getConfig();

export interface PostUserLoginParams extends UserInfoSchema {}
export interface PostUserLoginResponse {
  message: string;
}
export const postUserLogin = (data: PostUserLoginParams) => {
  return baseApi.post<PostUserLoginResponse>(`/login`, data);
};
