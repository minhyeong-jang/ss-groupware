import { GetBizCardItemSchema } from "apis";
import { format } from "date-fns";

export interface BizCardModel {
  name: string;
  time: string;
  requestAmount: number;
  type: BizCardType;
  note: string;
}
export enum BizCardType {
  "LUNCH" = "점심식대",
  "DINNER" = "야근식대",
  "DRIVE" = "야근교통비",
}

export const toBizCardUiModel = (
  data: GetBizCardItemSchema[]
): BizCardModel[] => {
  return data.map((item) => ({
    name: `[${item.mercName}] - ${item.mccName}`,
    time: format(
      new Date(
        `${item.authDate.replace(
          /([\d]{4})([\d]{2})([\d]{2})/,
          "$1-$2-$3"
        )} ${item.authTime.replace(/([\d]{2})([\d]{2})([\d]{2})/, "$1:$2:$3")}`
      ),
      "yyyy/MM/dd HH:mm:ss"
    ),
    requestAmount: item.requestAmount,
    type: convertTimeToBizCardType(item.mccName, item.authTime),
    note: item.note,
  }));
};

const convertTimeToBizCardType = (mccName: string, authTime: string) => {
  if (mccName.indexOf("택시") !== -1) {
    return BizCardType.DRIVE;
  }
  const hour = parseInt(authTime.slice(0, 2));
  if (hour < 15) {
    return BizCardType.LUNCH;
  }
  return BizCardType.DINNER;
};
