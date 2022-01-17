import axios from "axios";
import getConfig from "next/config";
import { UserInfoSchema } from "schema";
const { publicRuntimeConfig } = getConfig();

export interface PostCheckoutParams extends UserInfoSchema {}
export interface PostCheckoutResponse {
  message: string;
}
export const postCheckout = (data: PostCheckoutParams) => {
  return axios.post(`${publicRuntimeConfig.API_URL}/checkout`, data);
};
