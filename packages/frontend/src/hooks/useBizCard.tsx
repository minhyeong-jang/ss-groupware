import { message } from "antd";
import { getBizCardList, GetBizCardListParams, postCheckin } from "apis";
import { BizCardModel, toBizCardUiModel } from "models";
import { useCallback, useState } from "react";
import { ErrorModel } from "schema";

export const useBizCard = () => {
  const [userName, setUserName] = useState("");
  const [bizCardList, setBizCardList] = useState<BizCardModel[]>([]);
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
  return {
    userName,
    bizCardList,
    loading,
    onGetBizCardList,
  };
};
