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
        pageSize: 31,
        skip: 0,
        startDate: moment().startOf("month").format("YYYYMMDD"),
        take: 10,
      },
    });

    // 법인카드 사용 금액
    const bizcardList = await request.post({
      ...requestHeaders,
      url: "https://gw.musinsa.com/exp/expend/ex/user/card/ExCardListInfoSelect.do",
      formData: {
        ...BIZ_CARD_LIST,
        searchFromDate: moment().startOf("month").format("YYYYMMDD"),
        searchToDate: moment().endOf("month").format("YYYYMMDD"),
      },
    });
    const bizcardTotalPrice = bizcardList.aaData.reduce(
      (curr, next) => curr + next.requestAmount,
      0
    );

    res.send({
      restDay: restRes.result[0].restAnnvDayCnt,
      profile: {
        userName: userRes.result.empName,
        deptName: userRes.result.deptName,
      },
      workToday: {
        comeAt: workRes.result.resultList[0].comeDt,
        leaveAt: workRes.result.resultList[0].leaveDt,
      },
      bizcardTotalPrice,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "서버 오류가 발생하였습니다.", err });
  }
};
