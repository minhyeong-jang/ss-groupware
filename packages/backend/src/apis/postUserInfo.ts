import { Response, Request } from "express";
const request = require("request-promise-native");

export const postUserInfo = async (res: Response, { headers }: Request) => {
  try {
    const cookieHeader = headers?.cookie;

    // 유저 정보
    const userRes = await request.post({
      url: "https://gw.musinsa.com/attend/api/attend/searchPersonnalAttendStat",
      method: "POST",
      headers: {
        cookie: cookieHeader,
      },
      body: {
        approveYn: "",
        attDivCode: "",
        attItemCode: "",
        endDate: "20220506",
        startDate: "20220406",
      },
      json: true,
    });

    // 휴가 정보
    const restRes = await request.post({
      url: "https://gw.musinsa.com/attend/WebAnnv/SearchPersonAnnvMstList",
      method: "POST",
      headers: {
        cookie: cookieHeader,
      },
      json: true,
    });

    // 근태 정보
    const workRes = await request.post({
      url: "https://gw.musinsa.com/attend/api/attend/getSearchPersonAttList",
      method: "POST",
      headers: {
        cookie: cookieHeader,
      },
      body: {
        approveYn: "",
        attDivCode: "",
        attItemCode: "",
        endDate: "20220525",
        page: 1,
        pageNum: 1,
        pageSize: 10,
        skip: 0,
        startDate: "20220425",
        take: 10,
      },
      json: true,
    });

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
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "서버 오류가 발생하였습니다.", err });
  }
};
