import { message } from "antd";
import {
  getBizCardList,
  getBizCardListData,
  GetBizCardListParams,
  postBizCard,
  PostBizCardParams,
  postCheckin,
} from "apis";
import { BizCardModel, toBizCardUiModel } from "models";
import { useCallback, useState } from "react";
import { ErrorModel } from "schema";

export const useBizCard = () => {
  const [userName, setUserName] = useState("");
  const [bizCardList, setBizCardList] = useState<BizCardModel[]>(
    // toBizCardUiModel(getBizCardListData.bizCardList)
    []
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
  const onUpdateMemo = useCallback(
    async (params: PostBizCardParams) => {
      setLoading(true);
      try {
        await postBizCard(params);
        message.success("등록이 완료 되었습니다.");
      } catch (e) {
        message.error((e as ErrorModel).response?.data?.message);
      } finally {
        setLoading(false);
      }
    },
    [postBizCard]
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
    onUpdateMemo,
    onTypeChange,
    onNoteChange,
    onGetBizCardList,
  };
};
