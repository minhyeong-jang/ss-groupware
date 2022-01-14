import { message } from "antd";
import {
  getBizCardList,
  getBizCardListData,
  GetBizCardListParams,
  postCheckin,
} from "apis";
import { BizCardModel, toBizCardUiModel } from "models";
import { useCallback, useState } from "react";
import { ErrorModel } from "schema";

export const useBizCard = () => {
  const [userName, setUserName] = useState("");
  const [bizCardList, setBizCardList] = useState<BizCardModel[]>(
    toBizCardUiModel(getBizCardListData.bizCardList)
  );
  const [loading, setLoading] = useState(false);

  const onGetBizCardList = useCallback(
    async (params: GetBizCardListParams) => {
      setLoading(true);
      try {
        const res = await getBizCardList(params);
        setBizCardList(toBizCardUiModel(res.data.bizCardList));
        setUserName(res.data.userName);
      } catch (e) {
        message.error((e as ErrorModel).response?.data?.message);
      } finally {
        setLoading(false);
      }
    },
    [postCheckin]
  );
  const onTypeChange = useCallback(
    (type, index) => {
      const items = [...bizCardList];
      items[index].type = type;
      items[index].note = "";
      setBizCardList(items);
    },
    [bizCardList, setBizCardList]
  );
  const onNoteChange = useCallback(
    (note, index) => {
      const items = [...bizCardList];
      items[index].note = note;
      setBizCardList(items);
    },
    [bizCardList, setBizCardList]
  );
  return {
    userName,
    bizCardList,
    loading,
    onTypeChange,
    onNoteChange,
    onGetBizCardList,
  };
};
