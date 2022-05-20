import { Response, Request } from "express";
import { BIZ_CARD_LIST } from "../constants";
import * as moment from "moment";
const request = require("request-promise-native");

export const postUserInfo = async (res: Response, { headers }: Request) => {
  try {
    const requestHeaders = {
      method: "POST",
      headers: {
        cookie: headers?.cookie,
      },
      json: true,
    };

    // 유저 정보
    const userRes = await request.post({
      ...requestHeaders,
      url: "https://gw.musinsa.com/attend/api/attend/searchPersonnalAttendStat",
      body: {
        approveYn: "",
        attDivCode: "",
        attItemCode: "",
        endDate: "20220506",
        startDate: "20220406",
      },
    });

    // 휴가 정보
    const restRes = await request.post({
      ...requestHeaders,
      url: "https://gw.musinsa.com/attend/WebAnnv/SearchPersonAnnvMstList",
    });

    // 근태 정보
    const workRes = await request.post({
      ...requestHeaders,
      url: "https://gw.musinsa.com/attend/api/attend/getSearchPersonAttList",
      body: {
        approveYn: "",
        attDivCode: "",
        attItemCode: "",
        endDate: moment().endOf("month").format("YYYYMMDD"),
        page: 1,
        pageNum: 1,
        pageSize: 40,
        skip: 0,
        startDate: moment().startOf("month").format("YYYYMMDD"),
        take: 40,
      },
    });

    // 법인카드 사용 금액
    const bizCardList = await request.post({
      ...requestHeaders,
      url: "https://gw.musinsa.com/exp/expend/ex/user/card/ExCardListInfoSelect.do",
      formData: {
        ...BIZ_CARD_LIST,
        searchFromDate: moment().startOf("month").format("YYYYMMDD"),
        searchToDate: moment().endOf("month").format("YYYYMMDD"),
      },
    });
    const bizCardTotalPrice = bizCardList.aaData.reduce(
      (curr, next) => curr + next.requestAmount,
      0
    );

    const filterAfterDate = workRes.result.resultList.filter((item) =>
      moment().isAfter(moment(item.attDate, "YYYYMMDD"))
    );
    const isTodayWork =
      moment().subtract(6, "h").format("YYYYMMDD") ===
      filterAfterDate?.[0]?.attDate;

    const workDateCount = filterAfterDate.reduce(
      (prev, curr) =>
        prev +
        (curr.attItemName === "출퇴근" &&
        curr.attDivName !== "휴일출근" &&
        curr.week !== "토" &&
        curr.week !== "일"
          ? 1
          : 0),
      0
    );
    const monthlyWorking = workRes.result.resultList.reduce(
      (prev, curr) => {
        let leaveDt = null;
        if (curr.attItemName !== "출퇴근") {
          return {
            ...prev,
            notices: [
              ...prev.notices,
              {
                date: curr.attDate,
                message: `${curr.attItemName}`,
              },
            ],
          };
        }
        if (moment().subtract(6, "h").format("YYYYMMDD") === curr.attDate) {
          if (curr.comeDt === "") {
            return prev;
          } else if (curr.leaveDt === "") {
            leaveDt = moment();
          }
        } else if (curr.comeDt === "" || curr.leaveDt === "") {
          return {
            ...prev,
            notices: [
              ...prev.notices,
              {
                date: curr.attDate,
                message: `${curr.comeDt === "" ? "출" : ""}${
                  curr.leaveDt === "" ? "퇴" : ""
                }근 누락`,
              },
            ],
          };
        } else {
          leaveDt = moment(curr.leaveDt, "YYYYMMDDHHmmss");
        }

        const workHour =
          moment
            .duration(leaveDt.diff(moment(curr.comeDt, "YYYYMMDDHHmmss")))
            .asMinutes() - (curr.attItemName !== "휴일출근" ? 60 : 0);

        return {
          ...prev,
          workTime: prev.workTime + workHour,
        };
      },
      {
        notices: [],
        workTime: 0,
      }
    );

    // console.log(`법정 근로 시간 : ${workDateCount * 8}시간`);
    // console.log(
    //   `${Math.floor(monthlyWorking.workTime / 60)}시간 ${Math.round(
    //     monthlyWorking.workTime % 60
    //   )}분`
    // );
    // console.log(monthlyWorking.notes);

    res.send({
      restDay: restRes.result?.[0]?.restAnnvDayCnt || 0,
      profile: {
        userName: userRes.result.empName,
        deptName: userRes.result.deptName,
      },
      workToday: {
        comeAt: isTodayWork ? filterAfterDate?.[0]?.comeDt : "",
        leaveAt: isTodayWork ? filterAfterDate?.[0]?.leaveDt : "",
      },
      monthlyWork: {
        officialHour: workDateCount * 8,
        myWorkHour: Math.floor(monthlyWorking.workTime / 60),
        myWorkMinute: Math.round(monthlyWorking.workTime % 60),
        notices: monthlyWorking.notices,
      },
      bizCardTotalPrice,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "서버 오류가 발생하였습니다.", err });
  }
};
