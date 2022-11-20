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
  restDay: 10.25,
  profile: {
    deptName: "프론트엔드팀",
    userName: "장민형",
  },
  workToday: {
    comeAt: "10:13",
    leaveAt: "",
    progressPercent: 63,
  },
  bizCardTotalPrice: 75900,
  monthlyWork: {
    officialHour: 119,
    workHour: 17,
    workMinute: 20,
  },
  notices: [
    { date: "17일", message: "휴가" },
    { date: "16일", message: "출퇴근 누락" },
  ],
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
