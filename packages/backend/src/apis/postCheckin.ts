import { Response } from "express";
import { launchSetting } from "../utils/puppeteer";
const puppeteer = require("puppeteer");

interface PostCheckinParams {
  id: string;
  pw: string;
}

export const postCheckin = async (
  res: Response,
  { id, pw }: PostCheckinParams,
  type: "1" | "4"
) => {
  try {
    const browser = await puppeteer.launch(launchSetting);
    const page = await browser.newPage();
    await page.goto("https://gw.musinsa.com/gw/uat/uia/egovLoginUsr.do", {
      waitUntil: "networkidle2",
    });
    await page.evaluate(
      ({ id, pw, type }) => {
        var loginParams = {
          isScLogin: "Y",
          scUserId: id,
          scUserPwd: (window as any).securityEncrypt(pw),
          id: (window as any).securityEncrypt(id),
          id_sub1: "",
          id_sub2: "",
          password: (window as any).securityEncrypt(pw),
        };
        $.ajax({
          url: "https://gw.musinsa.com/gw/uat/uia/actionLogin.do",
          type: "post",
          async: false,
          data: loginParams,
          success: function (data) {
            if (!data.resultCode) {
              res.send("로그인 계정을 다시 확인해주세요.");
              return;
            }

            var tblParam = { gbnCode: type };
            $.ajax({
              url: "https://gw.musinsa.com/gw/insertComeLeaveEventApi.do",
              type: "post",
              data: tblParam,
              async: false,
              success: function (data) {
                if (data.resultCode == "SUCCESS") {
                  res.send(data.resultMessage);
                }
              },
            });
          },
        });
      },
      { id, pw, type }
    );
    res.send(true);
    return;
  } catch (err) {
    // if (!res.headersSent) {
    //   if ((err as any)?.errno === 1062) {
    //     res.status(400).json({ message: "이미 구독중인 이메일입니다." });
    //   }
    //   return;
    // }
    console.log(err);
    res.status(400).json({ message: "서버 에러가 발생하였습니다." });
  } finally {
  }
};
