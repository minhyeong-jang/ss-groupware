import { baseApi } from "./baseApi";

export interface PostUserLogoutResponse {
  message: string;
}
export const postUserLogout = () => {
  return baseApi.post<PostUserLogoutResponse>(`/logout`);
};
