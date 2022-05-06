import { GetUserInfoResponse } from "apis";
import moment from "moment";

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
  progressPercent: number;
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
        progressPercent: 0,
      },
    };
  }
  const startTime = moment(data.workToday.comeAt, "YYYYMMDDHHmmss");
  const endTime = moment(data.workToday.comeAt, "YYYYMMDDHHmmss").add(
    9,
    "hour"
  );

  return {
    ...data,
    workToday: {
      comeAt: data.workToday.comeAt && startTime.format("HH:mm"),
      leaveAt:
        data.workToday.leaveAt &&
        moment(data.workToday.leaveAt, "YYYYMMDDHHmmss").format("HH:mm"),
      progressPercent: data.workToday.comeAt
        ? (moment().diff(startTime) / endTime.diff(startTime)) * 100
        : 0,
    },
  };
};
