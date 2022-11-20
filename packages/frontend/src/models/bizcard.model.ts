import { GetBizCardListResponse } from "apis";

export interface BizCardModel {
  syncId: number;
  authSeq: string;
  empSeq: string;
  name: string;
  time: Date;
  requestAmount: number;
  type: BizCardType;
  note: string;
}
export enum BizCardType {
  "LUNCH" = "점심식대",
  "DINNER" = "야근식대",
  "DRIVE" = "야근교통비",
}

export const initBizCardModel = {
  bizCardList: [
    {
      syncId: 1,
      authSeq: "0",
      empSeq: "0",
      mercName: "토스페이_일반",
      mccName: "PG쇼핑몰",
      authDate: "20221111",
      authTime: "022301",
      requestAmount: 36500,
      note: "",
    },
    {
      syncId: 2,
      authSeq: "0",
      empSeq: "0",
      mercName: "토스페이_일반",
      mccName: "PG쇼핑몰",
      authDate: "20221109",
      authTime: "011324",
      requestAmount: 39400,
      note: "",
    },
  ],
};
export const toBizCardUiModel = ({
  bizCardList,
}: GetBizCardListResponse): BizCardModel[] => {
  return bizCardList
    .map((item) => ({
      syncId: item.syncId,
      name: `[${item.mercName}] - ${item.mccName}`,
      time: new Date(
        `${item.authDate.replace(
          /([\d]{4})([\d]{2})([\d]{2})/,
          "$1-$2-$3"
        )}T${item.authTime.replace(/([\d]{2})([\d]{2})([\d]{2})/, "$1:$2:$3")}`
      ),
      requestAmount: item.requestAmount,
      type: convertTimeToBizCardType(item.mccName, item.authTime, item.note),
      note: item.note,
      authSeq: item.authSeq,
      empSeq: item.empSeq,
    }))
    .sort((a, b) => (b.time > a.time ? 1 : b.time < a.time ? -1 : 0));
};

const convertTimeToBizCardType = (
  mccName: string,
  authTime: string,
  note: string
) => {
  if (note) {
    const targetType = Object.keys(BizCardType)
      .map((type) => BizCardType[type as keyof typeof BizCardType])
      .filter((item) => note.indexOf(item) !== -1)[0];
    if (targetType) {
      return targetType;
    }
  }

  if (mccName.indexOf("택시") !== -1) {
    return BizCardType.DRIVE;
  }

  const hour = parseInt(authTime.slice(0, 2));
  if (hour === 23 || (hour >= 0 && hour <= 6)) {
    return BizCardType.DRIVE;
  }
  if (hour < 15) {
    return BizCardType.LUNCH;
  }
  return BizCardType.DINNER;
};
