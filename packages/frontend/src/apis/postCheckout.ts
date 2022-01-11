import axios from "axios";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export interface PostCheckoutParams {
  id: string;
  pw: string;
}
export interface PostCheckoutResponse {
  message: string;
}
export const postCheckout = (data: PostCheckoutParams) => {
  return axios.post(`${publicRuntimeConfig.API_URL}/checkout`, data);
};
