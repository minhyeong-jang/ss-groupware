import { baseApi } from "./baseApi";

export interface GetUserInfoResponse {
  restDay: number;
  profile: GerUserInfoProfileSchema;
  workToday: GetUserInfoWorkTodaySchema;
  bizCardTotalPrice: number;
}
export interface GerUserInfoProfileSchema {
  userName: string;
  deptName: string;
}
export interface GetUserInfoWorkTodaySchema {
  comeAt: string;
  leaveAt: string;
}

export const getUserInfo = () => {
  return baseApi.get<GetUserInfoResponse>(`/profile`);
};
