import { GetUserInfoResponse } from "apis";

export interface UserInfoModel {
  restDay: number;
  profile: UserInfoProfileModel;
  workToday: UserInfoWorkTodayModel;
}
export interface UserInfoProfileModel {
  userName: string;
  deptName: string;
}
export interface UserInfoWorkTodayModel {
  comeAt: string;
  leaveAt: string;
}

export const convertUserInfoModel = (
  data?: GetUserInfoResponse
): UserInfoModel => {
  if (!data) {
    return {
      restDay: 0,
      profile: {
        userName: "",
        deptName: "",
      },
      workToday: {
        comeAt: "",
        leaveAt: "",
      },
    };
  }
  return data;
};
