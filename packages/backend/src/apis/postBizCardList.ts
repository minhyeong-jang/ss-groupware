import { Response } from "express";
import { ResponseModel } from "../types";
import { pageLogin } from "../utils";
import { launchSetting } from "../utils/puppeteer";
import { BIZ_CARD_LIST } from "../constants";
import { UserInfoModel } from "../types/user";
const puppeteer = require("puppeteer");

interface BizCardSchema {
  syncId: number;
  mercName: string;
  mccName: string;
  authDate: string;
  authTime: string;
  requestAmount: number;
  note: string;
}
interface PostBizCardListParams {
  userInfo: UserInfoModel;
  startDate: string;
  endDate: string;
}
interface PostBizCardListResponse extends ResponseModel {
  bizCardList?: BizCardSchema[];
}

export const postBizCardList = async (
  res: Response,
  { userInfo, startDate, endDate }: PostBizCardListParams
) => {
  const browser = await puppeteer.launch(launchSetting);

  try {
    const page = await browser.newPage();
    const loginRes = await pageLogin(page, userInfo);
    if (loginRes.code !== 200) {
      res.status(loginRes.code).json(loginRes);
    }

    const pageRes = await page.evaluate(
      ({ BIZ_CARD_LIST, startDate, endDate }) => {
        try {
          let response: PostBizCardListResponse = {
            code: 200,
          };

          const listParams = {
            ...BIZ_CARD_LIST,
            searchFromDate: startDate,
            searchToDate: endDate,
          };
          $.ajax({
            url: "https://gw.musinsa.com/exp/expend/ex/user/card/ExCardListInfoSelect.do",
            type: "post",
            async: false,
            data: listParams,
            error: (error) => {
              response = {
                code: 400,
                message: "서버 오류가 발생하였습니다.",
                error,
              };
            },
            success: (data) => {
              const newData = data.aaData.map((item) => ({
                syncId: item.syncId,
                authSeq: item.authSeq,
                empSeq: item.empSeq,
                mercName: item.mercName,
                mccName: item.mccName,
                authDate: item.authDate,
                authTime: item.authTime,
                requestAmount: item.requestAmount,
                note: item.note,
              }));
              response = {
                code: 200,
                bizCardList: newData,
              };
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
      { BIZ_CARD_LIST, startDate, endDate }
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
