import { baseApi } from "./baseApi";

export interface PostBizCardParams {
  items: {
    syncId: string;
    note: string;
    type: string;
    authSeq: string;
    empSeq: string;
  }[];
}
export interface PostBizCardResponse {
  message: string;
}
export const postBizCard = (data: PostBizCardParams) => {
  return baseApi.post<PostBizCardResponse>(`/bizcard/submit`, data);
};
