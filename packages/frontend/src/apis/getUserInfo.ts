import { baseApi } from "./baseApi";

export interface GetUserInfoResponse {
  restDay: number;
  profile: GerUserInfoProfileSchema;
  workToday: GetUserInfoWorkTodaySchema;
  bizCardTotalPrice: number;
  monthlyWork: {
    officialHour: number;
    myWorkHour: number;
    myWorkMinute: number;
    notices: {
      date: string;
      message: string;
    }[];
  };
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
