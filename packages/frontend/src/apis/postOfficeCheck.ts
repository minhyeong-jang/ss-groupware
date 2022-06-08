import { baseApi } from "./baseApi";

export interface PostOfficeCheckParams {
  type: "1" | "4";
}
export interface PostOfficeCheckResponse {
  message: string;
}
export const postOfficeCheck = (data: PostOfficeCheckParams) => {
  return baseApi.post<PostOfficeCheckResponse>(`/office-check`, data);
};
