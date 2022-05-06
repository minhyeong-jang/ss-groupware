import { Response, Request } from "express";
import { ResponseModel } from "../types";
import { UserInfoModel } from "../types/user";
const puppeteer = require("puppeteer");
const request = require("request-promise-native");

interface PostUserInfoParams extends UserInfoModel {}
interface PostUserInfoResponse extends ResponseModel {}

export const postUserInfo = async (res: Response, { headers }: Request) => {
  try {
    const cookieHeader = headers?.cookie;

    // 휴가 정보
    const options = {
      url: "https://gw.musinsa.com/attend/WebAnnv/SearchPersonAnnvMstList",
      method: "POST",
      headers: {
        cookie: cookieHeader,
      },
      json: true,
    };
    const restRes = await request.post(options);

    res.send({ restDay: restRes.result[0].restAnnvDayCnt });
  } catch (err) {
    res.status(400).json({ message: "서버 오류가 발생하였습니다.", err });
  }
};
