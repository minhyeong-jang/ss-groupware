import { baseApi } from "./baseApi";

export interface GetBizCardListParams {
  startDate: string;
  endDate: string;
}
export interface GetBizCardListResponse {
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
  return baseApi.post<GetBizCardListResponse>(`/bizcard`, data);
};
