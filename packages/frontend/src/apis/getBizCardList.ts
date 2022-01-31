import axios from "axios";
import getConfig from "next/config";
import { UserInfoSchema } from "schema/userinfo.schema";
const { publicRuntimeConfig } = getConfig();

export interface GetBizCardListParams {
  userInfo: UserInfoSchema;
  startDate: string;
  endDate: string;
}
export interface GetBizCardListResponse {
  userName: string;
  bizCardList: GetBizCardItemSchema[];
}
export interface GetBizCardItemSchema {
  syncId: number;
  authSeq: string;
  empSeq: string;
  mercName: string;
  mccName: string;
  authDate: string;
  authTime: string;
  requestAmount: number;
  note: string;
}
export const getBizCardList = (data: GetBizCardListParams) => {
  return axios.post(`${publicRuntimeConfig.API_URL}/bizcard`, data);
};
