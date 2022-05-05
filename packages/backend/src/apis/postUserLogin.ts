import { Response } from "express";
import { ResponseModel } from "../types";
import { UserInfoModel } from "../types/user";
import { pageLogin } from "../utils";
import { launchSetting } from "../utils/puppeteer";
const puppeteer = require("puppeteer");

interface PostLoginParams extends UserInfoModel {}

export const postUserLogin = async (
  res: Response,
  userInfo: PostLoginParams
) => {
  const browser = await puppeteer.launch(launchSetting);

  try {
    const page = await browser.newPage();
    const loginRes = await pageLogin(page, userInfo);
    if (loginRes.code !== 200) {
      res.status(loginRes.code).json(loginRes);
    }

    const cookies = await page.cookies();
    cookies.map((cookie) => {
      res.cookie(cookie.name, JSON.stringify(cookie));
    });

    loginRes.code === 200
      ? res.send(loginRes)
      : res.status(loginRes.code).json(loginRes);
  } catch (err) {
    res.status(400).json({ message: "서버 오류가 발생하였습니다.", err });
  } finally {
    await browser.close();
  }
};
