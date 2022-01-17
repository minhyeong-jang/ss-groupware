import { Response } from "express";
import { ResponseModel } from "../types";
import { UserInfoModel } from "../types/user";
import { pageLogin } from "../utils";
import { launchSetting } from "../utils/puppeteer";
const puppeteer = require("puppeteer");

interface PostCheckinParams extends UserInfoModel {}
interface PostCheckinResponse extends ResponseModel {}

export const postCheckin = async (
  res: Response,
  userInfo: PostCheckinParams,
  loginType: "1" | "4"
) => {
  const browser = await puppeteer.launch(launchSetting);

  try {
    const page = await browser.newPage();
    const loginRes = await pageLogin(page, userInfo);
    if (loginRes.code !== 200) {
      res.status(loginRes.code).json(loginRes.message);
    }

    const pageRes = await page.evaluate(
      ({ loginType }) => {
        try {
          let response: PostCheckinResponse = {
            code: 200,
          };
          const tblParam = { gbnCode: loginType };
          $.ajax({
            url: "https://gw.musinsa.com/gw/insertComeLeaveEventApi.do",
            type: "post",
            data: tblParam,
            async: false,
            error: (error) => {
              response = {
                code: 400,
                message: "서버 오류가 발생하였습니다.",
                error,
              };
            },
            success: function (data) {
              if (data.resultCode == "SUCCESS") {
                response = {
                  message: data.resultMessage,
                  code: 200,
                };
              } else {
                response = {
                  code: 400,
                  message: "서버 에러가 발생하였습니다.",
                };
              }
            },
          });
          return response;
        } catch (error) {
          return {
            code: error.code,
            message: error.message,
          };
        }
      },
      { loginType }
    );
    pageRes.code === 200
      ? res.send(pageRes)
      : res.status(pageRes.code).json(pageRes);
  } catch (err) {
    res.status(400).json({ message: "서버 오류가 발생하였습니다.", err });
  } finally {
    await browser.close();
  }
};
