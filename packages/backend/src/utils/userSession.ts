import { Response, Request } from "express";
const request = require("request-promise-native");

export const userSession = async (res: Response, req: Request) => {
  try {
    const cookieHeader = req?.headers.cookie;
    const filterCookie = cookieHeader
      .split("; ")
      .filter((item) => item.match(/(GWSESSIONID)|(JSESSIONID)/));

    if (!filterCookie.length) {
      res.status(403).json({ message: "로그인이 필요합니다." });
      return false;
    }

    const options = {
      url: "https://gw.musinsa.com/gw/uat/uia/serverSessionReset.do",
      method: "POST",
      headers: {
        cookie: filterCookie.join("; "),
      },
      json: true,
    };
    const response = await request.post(options);
    if (!response?.isAuthenticated) {
      res.status(403).json({ message: "로그인이 필요합니다." });
      return false;
    }
    return true;
  } catch (e) {
    res.status(403).json({ message: "로그인이 필요합니다." });
    return false;
  }
};
