import { Response } from "express";
import { launchSetting } from "../utils/puppeteer";
import { FOOD_PARAMS, DRIVE_PARAMS } from "../constants";
import { UserInfoModel } from "../types/user";
import { ResponseModel } from "../types";
import { pageLogin } from "../utils";
const puppeteer = require("puppeteer");

interface PostBizCardSubmitParams {
  userInfo: UserInfoModel;
  items: { syncId: string; note: string }[];
}
interface PostBizCardListResponse extends ResponseModel {}

export const postBizCardSubmit = async (
  res: Response,
  { userInfo, items }: PostBizCardSubmitParams
) => {
  if (!items.length) {
    res.status(400).json({ message: "필수값을 선택해주세요." });
  }
  const browser = await puppeteer.launch(launchSetting);

  try {
    const page = await browser.newPage();
    const loginRes = await pageLogin(page, userInfo);
    if (loginRes.code !== 200) {
      res.status(loginRes.code).json(loginRes);
    }

    const pageRes = await page.evaluate(
      ({ items, FOOD_PARAMS, DRIVE_PARAMS }) => {
        try {
          let response: PostBizCardListResponse = {
            code: 200,
          };

          const params = { formSeq: "24" };
          $.ajax({
            type: "post",
            url: "https://gw.musinsa.com/exp/ex/expend/master/ExUserInitExpend.do",
            async: false,
            data: params,
            success: (data) => {
              items.map((item) => {
                const targetParams =
                  item.type === "FOOD" ? FOOD_PARAMS : DRIVE_PARAMS;
                const params = {
                  ...targetParams,
                  target: JSON.stringify([
                    {
                      key: item.syncId,
                      syncId: item.syncId,
                    },
                  ]),
                  empInfo: JSON.stringify({
                    ...targetParams.empInfo,
                    bizSeq: data.aaData.empInfo.bizSeq,
                    compSeq: data.aaData.empInfo.compSeq,
                    empSeq: data.aaData.empInfo.empSeq,
                    empName: data.aaData.empInfo.empName,
                    erpEmpSeq: data.aaData.empInfo.erpEmpSeq,
                    erpCompSeq: data.aaData.empInfo.erpCompSeq,
                    groupSeq: data.aaData.empInfo.groupSeq,

                    createSeq: data.aaData.empInfo.empSeq,
                    modifySeq: data.aaData.empInfo.empSeq,
                    searchStr: data.aaData.empInfo.erpEmpSeq,
                  }),
                  note: item.note,
                };
                $.ajax({
                  dataType: "json",
                  type: "post",
                  url: "https://gw.musinsa.com/exp/expend/ex/user/card/ExCardInfoMapUpdate.do",
                  async: false,
                  data: params,
                  success: function (data) {
                    if (data?.aaData?.code === "SUCCESS") {
                      response = {
                        code: 200,
                        message: "SUCCESS",
                      };
                    } else {
                      response = {
                        code: 400,
                        message:
                          "에러가 발생하였습니다. 개발자에게 문의해주세요.",
                      };
                    }
                  },
                });
              });
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
      { items, FOOD_PARAMS, DRIVE_PARAMS }
    );
    await page.waitFor(2000);
    pageRes.code === 200
      ? res.send(pageRes)
      : res.status(pageRes.code).json(pageRes);
  } catch (err) {
    res.status(400).json({ message: "서버 오류가 발생하였습니다.", err });
  } finally {
    await browser.close();
  }
};
