import { Response } from "express";
import { launchSetting } from "../utils/puppeteer";
const puppeteer = require("puppeteer");

interface PostCheckinParams {
  id: string;
  pw: string;
}

export const postBizCardSubmit = async (
  res: Response,
  { id, pw }: PostCheckinParams
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
    const pageRes = await page.evaluate(
      async ({ id, pw }) => {
        try {
          const loginParams = {
            isScLogin: "Y",
            scUserId: id,
            scUserPwd: (window as any).securityEncrypt(pw),
            id: (window as any).securityEncrypt(id),
            id_sub1: "",
            id_sub2: "",
            password: (window as any).securityEncrypt(pw),
          };
          const { userName } = await new Promise((resolve, reject) =>
            $.ajax({
              url: "https://gw.musinsa.com/gw/uat/uia/actionLogin.do",
              type: "post",
              async: false,
              data: loginParams,
              error: (error) => {
                reject({
                  code: 400,
                  message: "서버 오류가 발생하였습니다.",
                  error,
                });
              },
              success: (data) => {
                if (!data.resultCode) {
                  if (
                    data.indexOf("더존 그룹웨어에 오신것을 환영합니다.") !== -1
                  ) {
                    reject({
                      code: 400,
                      message: "로그인 계정을 다시 확인해주세요.",
                    });
                  }
                }
                resolve({
                  userName: data.match(
                    /[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9\/\_\s\:\.\"\<\>\=]*<span class="txt_nm">([^\<]*)/
                  )?.[1],
                });
              },
            })
          );
          const listParams = {
            seq: "0",
            useYN: "Y",
            formSeq: "0",
            createSeq: "0",
            modifySeq: "0",
            searchFromDate: "20210101",
            searchToDate: "20220132",
            syncId: "0",
            gongjeNoChk: "N",
            requestAmount: "0",
            vatMdAmount: "0",
            amtMdAmount: "0",
            serAmount: "0",
            sendYN: "N",
            userSendYN: "N",
            ifDId: "0",
            expendSeq: "84847",
            sorting: "ASC",
            isSearchWithCancel: "N",
            compSeq: "",
            empCompSeq: "",
            cardCode: "",
            cardNum: "",
            cardName: "",
            partnerCode: "",
            partnerName: "",
            cardPublicJson: "",
            cardPublic: "",
            erpCompSeq: "",
            bankPartnerCode: "",
            bankPartnerName: "",
            callback: "",
            searchStr: "",
            searchType: "",
            searchCardNum: "",
            authDate: "",
            authTime: "",
            authNum: "",
            georaeCand: "",
            mercName: "",
            mercSaupNo: "",
            mercTel: "",
            mercZip: "",
            mercAddr: "",
            mccStat: "",
            empSeq: "",
            dispEmpName: "",
            deptSeq: "",
            erpDeptSeq: "",
            empName: "",
            erpEmpName: "",
            summarySeq: "",
            dispSummaryName: "",
            summaryName: "",
            drAcctCode: "",
            drAcctName: "",
            authSeq: "",
            dispAuthName: "",
            authName: "",
            projectSeq: "",
            dispProjectName: "",
            projectCode: "",
            projectName: "",
            budgetSeq: "",
            dispBudgetName: "",
            dispBizplanName: "",
            dispBgacctName: "",
            budgetName: "",
            bizplanName: "",
            bgacctName: "",
            note: "",
            ifMId: "",
            georaeStat: "",
            abroad: "",
            docSeq: "",
            docNo: "",
            docTitle: "",
            docSts: "",
            docUseYN: "",
            formMode: "",
            mercRepr: "",
            whereUsed: "",
            corporateRegistrationNumber: "",
          };
          const { bizCardList } = await new Promise((resolve, reject) =>
            $.ajax({
              url: "https://gw.musinsa.com/exp/expend/ex/user/card/ExCardListInfoSelect.do",
              type: "post",
              async: false,
              data: listParams,
              error: (error) => {
                reject({
                  code: 400,
                  message: "서버 오류가 발생하였습니다.",
                  error,
                });
              },
              success: function (data) {
                const newData = data.aaData.map((item) => ({
                  mercName: item.mercName,
                  mccName: item.mccName,
                  authTime: new Date(
                    `${item.authDate.replace(
                      /([\d]{4})([\d]{2})([\d]{2})/,
                      "$1-$2-$3"
                    )} ${item.authTime.replace(
                      /([\d]{2})([\d]{2})([\d]{2})/,
                      "$1:$2:$3"
                    )}`
                  ),
                  requestAmount: item.requestAmount,
                  note: item.note,
                }));
                resolve({ bizCardList: newData });
              },
            })
          );
          return { code: 200, bizCardList, userName };
        } catch (error) {
          return {
            code: error.code,
            message: error.message,
          };
        }
      },
      { id, pw }
    );
    pageRes.code === 200
      ? res.send(pageRes)
      : res.status(pageRes.code).json(pageRes);
  } catch (err) {
    res.status(400).json({ message: "서버 에러가 발생하였습니다.", err });
  } finally {
    await browser.close();
  }
};
