import { Response, Request } from "express";
import { BIZ_CARD_LIST } from "../constants";
import { UserInfoModel } from "../types/user";
const request = require("request-promise-native");

interface PostBizCardListParams {
  userInfo: UserInfoModel;
  startDate: string;
  endDate: string;
}

export const postBizCardList = async (
  res: Response,
  { headers }: Request,
  { startDate, endDate }: PostBizCardListParams
) => {
  try {
    const bizCardList = await request.post({
      method: "POST",
      headers: {
        cookie: headers?.cookie,
      },
      json: true,
      url: "https://gw.musinsa.com/exp/expend/ex/user/card/ExCardListInfoSelect.do",
      formData: {
        ...BIZ_CARD_LIST,
        searchFromDate: startDate,
        searchToDate: endDate,
      },
    });
    const newData = bizCardList.aaData.map((item) => ({
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
    res.send({
      bizCardList: newData,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "서버 오류가 발생하였습니다.", err });
  }
};
