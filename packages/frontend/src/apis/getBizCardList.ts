import axios from "axios";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export interface GetBizCardListParams {
  id: string;
  pw: string;
}
export interface GetBizCardListResponse {
  userName: string;
  bizCardList: GetBizCardItemSchema[];
}
export interface GetBizCardItemSchema {
  mercName: string;
  mccName: string;
  authDate: string;
  authTime: string;
  type: string;
  requestAmount: number;
  note: string;
}
export const getBizCardList = (data: GetBizCardListParams) => {
  return axios.post(`${publicRuntimeConfig.API_URL}/bizcard`, data);
};
