import { Response, Request } from "express";
import { FOOD_PARAMS, DRIVE_PARAMS } from "../constants";

const request = require("request-promise-native");

interface PostBizCardSubmitParams {
  items: {
    syncId: string;
    authSeq: string;
    note: string;
    empSeq: string;
    type: "FOOD" | "DRIVE";
  }[];
}

export const postBizCardSubmit = async (
  res: Response,
  { headers }: Request,
  { items }: PostBizCardSubmitParams
) => {
  const cookie = headers?.cookie;
  if (!items.length) {
    res.status(400).json({ message: "필수값을 선택해주세요." });
  }

  try {
    const exUserInitExpend = await request.post({
      method: "POST",
      headers: { cookie },
      json: true,
      url: "https://gw.musinsa.com/exp/ex/expend/master/ExUserInitExpend.do",
      formData: { formSeq: "24" },
    });
    const result = await Promise.all(
      items.map(async (item) => {
        return await new Promise(async (resolve) => {
          try {
            const targetParams =
              item.type === "FOOD" ? FOOD_PARAMS : DRIVE_PARAMS;
            const formData = {
              ...targetParams,
              target: JSON.stringify([
                {
                  key: item.syncId,
                  syncId: item.syncId,
                },
              ]),
              authInfo: JSON.stringify({
                ...targetParams.authInfo,
                seq: item.authSeq,
              }),
              empInfo: JSON.stringify({
                ...targetParams.empInfo,
                seq: item.empSeq,
                bizSeq: exUserInitExpend.aaData.empInfo.bizSeq,
                compSeq: exUserInitExpend.aaData.empInfo.compSeq,
                empSeq: exUserInitExpend.aaData.empInfo.empSeq,
                empName: exUserInitExpend.aaData.empInfo.empName,
                erpEmpSeq: exUserInitExpend.aaData.empInfo.erpEmpSeq,
                erpCompSeq: exUserInitExpend.aaData.empInfo.erpCompSeq,
                groupSeq: exUserInitExpend.aaData.empInfo.groupSeq,
                createSeq: exUserInitExpend.aaData.empInfo.empSeq,
                modifySeq: exUserInitExpend.aaData.empInfo.empSeq,
                searchStr: exUserInitExpend.aaData.empInfo.erpEmpSeq,
              }),
              note: item.note,
            };
            const data = await request.post({
              headers: { cookie },
              json: true,
              url: "https://gw.musinsa.com/exp/expend/ex/user/card/ExCardInfoMapUpdate.do",
              formData: formData,
            });
            if (data?.aaData?.code === "SUCCESS") {
              return resolve(true);
            } else {
              return resolve(false);
            }
          } catch (e) {
            console.log(e);
            return resolve(false);
          }
        });
      })
    );
    const isFailed = result.filter((isSuccess) => !isSuccess).length;
    if (isFailed) {
      res.send({
        message: `총 ${result.length}개 중 ${isFailed}개가 실패했습니다.`,
        code: 400,
      });
    } else {
      res.send({ message: "정상적으로 반영되었습니다.", code: 200 });
    }
  } catch (err) {
    res.status(400).json({ message: "서버 오류가 발생하였습니다.", err });
  }
};
