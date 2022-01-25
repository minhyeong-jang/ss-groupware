import { message } from "antd";
import {
  getBizCardList,
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
  const [bizCardList, setBizCardList] = useState<BizCardModel[]>([]);
  const [status, setStatus] = useState("idle");

  const onGetBizCardList = useCallback(
    async (params: GetBizCardListParams) => {
      setStatus("loading");
      try {
        const res = await getBizCardList(params);
        setBizCardList(toBizCardUiModel(res.data.bizCardList));
        setUserName(res.data.userName);
        setStatus("success");
      } catch (e) {
        setStatus("error");
        message.error((e as ErrorModel).response?.data?.message);
      }
    },
    [postCheckin]
  );
  const onUpdateMemo = useCallback(
    async (params: PostBizCardParams) => {
      setStatus("loading");
      try {
        await postBizCard(params);
        message.success("등록이 완료 되었습니다.");
      } catch (e) {
        message.error((e as ErrorModel).response?.data?.message);
      } finally {
        setStatus("success");
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
    status,
    loading: status === "loading",
    onUpdateMemo,
    onTypeChange,
    onNoteChange,
    onGetBizCardList,
  };
};
