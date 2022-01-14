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
  const browser = await puppeteer.launch(launchSetting);

  try {
    const page = await browser.newPage();

    await page.goto("https://gw.musinsa.com/gw/uat/uia/actionLogout.do", {
      waitUntil: "networkidle2",
    });
    await page.goto("https://gw.musinsa.com/gw/uat/uia/egovLoginUsr.do", {
      waitUntil: "networkidle2",
    });
    const { code, message } = await page.evaluate(
      ({ id, pw, type }) => {
        var response = {
          code: 200,
          message: "",
        };
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
              if (data.indexOf("더존 그룹웨어에 오신것을 환영합니다.") !== -1) {
                response = {
                  code: 400,
                  message: "로그인 계정을 다시 확인해주세요.",
                };
                return;
              }
            }

            var tblParam = { gbnCode: type };
            $.ajax({
              url: "https://gw.musinsa.com/gw/insertComeLeaveEventApi.do",
              type: "post",
              data: tblParam,
              async: false,
              success: function (data) {
                if (data.resultCode == "SUCCESS") {
                  response = {
                    message: data.resultMessage,
                    code: 200,
                  };
                  return;
                } else {
                  response = {
                    code: 400,
                    message: "서버 에러가 발생하였습니다.",
                  };
                  return;
                }
              },
            });
          },
        });
        return response;
      },
      { id, pw, type }
    );
    code === 200 ? res.send({ message }) : res.status(code).json({ message });
  } catch (err) {
    res.status(400).json({ message: "서버 에러가 발생하였습니다.", err });
  } finally {
    await browser.close();
  }
};
