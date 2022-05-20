import { GetUserInfoResponse } from "apis";
import moment from "moment";

export interface UserInfoModel {
  restDay: number;
  profile: UserInfoProfileModel;
  workToday: UserInfoWorkTodayModel;
  bizCardTotalPrice: number;
  monthlyWork: UserInfoMonthlyWorkModel;
  notices: UserInfoMonthlyNoticeModel[];
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
export interface UserInfoMonthlyWorkModel {
  officialHour: number;
  workHour: number;
  workMinute: number;
}
export interface UserInfoMonthlyNoticeModel {
  date: string;
  message: string;
}
export const initUserInfoModel: UserInfoModel = {
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
  bizCardTotalPrice: 0,
  monthlyWork: {
    officialHour: 0,
    workHour: 0,
    workMinute: 0,
  },
  notices: [],
};
export const convertUserInfoModel = (
  data?: GetUserInfoResponse
): UserInfoModel => {
  if (!data) {
    return initUserInfoModel;
  }
  const startTime = moment(data.workToday.comeAt, "YYYYMMDDHHmmss");
  const endTime = moment(data.workToday.comeAt, "YYYYMMDDHHmmss").add(
    9,
    "hour"
  );

  return {
    ...data,
    monthlyWork: {
      officialHour: data.monthlyWork.officialHour,
      workHour: data.monthlyWork.myWorkHour,
      workMinute: data.monthlyWork.myWorkMinute,
    },
    workToday: {
      comeAt: data.workToday.comeAt && startTime.format("HH:mm"),
      leaveAt:
        data.workToday.leaveAt &&
        moment(data.workToday.leaveAt, "YYYYMMDDHHmmss").format("HH:mm"),
      progressPercent: data.workToday.comeAt
        ? Math.round((moment().diff(startTime) / endTime.diff(startTime)) * 100)
        : 0,
    },
    notices: data.monthlyWork.notices.map((item) => ({
      date: moment(item.date, "YYYYMMDDHHmmss").format("DD일"),
      message: item.message,
    })),
  };
};
