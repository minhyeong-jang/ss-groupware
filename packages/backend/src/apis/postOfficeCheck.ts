import { Response, Request } from "express";
const request = require("request-promise-native");

export const postOfficeCheck = async (
  res: Response,
  { headers }: Request,
  loginType: "1" | "4"
) => {
  try {
    const cookieHeader = headers?.cookie;
    const result = await request.post({
      url: "https://gw.musinsa.com/gw/insertComeLeaveEventApi.do",
      method: "POST",
      headers: {
        cookie: cookieHeader,
      },
      formData: {
        gbnCode: loginType,
      },
      json: true,
    });

    if (result.resultCode !== "SUCCESS") {
      res
        .status(400)
        .json({ ...result, message: "서버 오류가 발생하였습니다." });
    }
    res.send({ message: result.resultMessage, code: 200 });
  } catch (err) {
    res.status(400).json({ message: "서버 오류가 발생하였습니다.", err });
  }
};
