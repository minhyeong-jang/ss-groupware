import { baseApi } from "./baseApi";

export interface GetUserInfoResponse {
  restDay: number;
}

export const getUserInfo = () => {
  return baseApi.get<GetUserInfoResponse>(`/profile`);
};
