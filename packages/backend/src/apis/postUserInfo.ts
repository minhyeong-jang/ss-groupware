import { Response, Request } from "express";
import { ResponseModel } from "../types";
import { CompanyType, UserInfoModel } from "../types/user";
import { pageLogin } from "../utils";
import { launchSetting } from "../utils/puppeteer";
const puppeteer = require("puppeteer");
const request = require("request-promise-native");

interface PostUserInfoParams extends UserInfoModel {}
interface PostUserInfoResponse extends ResponseModel {}

export const postUserInfo = async (
  res: Response,
  { headers, body: { userInfo } }: Request
) => {
  console.log("test");
  // const cookieHeader = headers?.cookie;
  // const options = {
  //   url: "https://gw.musinsa.com/attend/api/attend/getSearchPersonAttList",
  //   method: "POST",
  //   body: {
  //     approveYn: "",
  //     attDivCode: "",
  //     attItemCode: "",
  //     endDate: "20220531",
  //     page: 1,
  //     pageNum: 1,
  //     pageSize: 100,
  //     skip: 0,
  //     startDate: "20220501",
  //     take: 100,
  //   },
  //   headers: {
  //     cookie: cookieHeader,
  //   },
  //   json: true,
  // };
  // const response = await request.post(options);
  // console.log(response.result.resultList);
  // , (error, response, body) => {
  // });

  res.status(200).json({ test: "test" });
  // const browser = await puppeteer.launch(launchSetting);

  try {
    // if (loginRes.code !== 200) {
    //   res.status(loginRes.code).json(loginRes);
    // }
    // const cookies = await page.cookies();
    // cookies.map((cookie) => {
    //   console.log(cookie);
    //   res.cookie(cookie.name, JSON.stringify(cookie));
    // });
    // const pageRes = await page.evaluate(({ loginType }) => {
    //   try {
    //     let response: GetUserInfoResponse = {
    //       code: 200,
    //     };
    //     const tblParam = { gbnCode: loginType };
    //     $.ajax({
    //       url: "https://gw.musinsa.com/gw/insertComeLeaveEventApi.do",
    //       type: "post",
    //       data: tblParam,
    //       async: false,
    //       error: (error) => {
    //         response = {
    //           code: 400,
    //           message: "서버 오류가 발생하였습니다.",
    //           error,
    //         };
    //       },
    //       success: function (data) {
    //         if (data.resultCode == "SUCCESS") {
    //           response = {
    //             message: data.resultMessage,
    //             code: 200,
    //           };
    //         } else {
    //           response = {
    //             code: 400,
    //             message: "서버 에러가 발생하였습니다.",
    //           };
    //         }
    //       },
    //     });
    //     return response;
    //   } catch (error) {
    //     return {
    //       code: error.code,
    //       message: error.message,
    //     };
    //   }
    // });
    // pageRes.code === 200
    //   ? res.send(pageRes)
    //   : res.status(pageRes.code).json(pageRes);
    // res.status(200).json({ test: "test" });
  } catch (err) {
    res.status(400).json({ message: "서버 오류가 발생하였습니다.", err });
  } finally {
    // await browser.close();
  }
};
