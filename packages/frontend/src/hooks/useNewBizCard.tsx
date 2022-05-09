import { message } from "antd";
import {
  ErrorDataModel,
  getBizCardList,
  GetBizCardListParams,
  postBizCard,
  PostBizCardParams,
} from "apis";
import { toBizCardUiModel } from "models";
import { useCallback, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { ErrorModel } from "schema";

export const useBizCardTest = () => {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState("idle");

  const {
    data: bizCardList,
    mutateAsync: onBizcardList,
    isLoading: isListLoading,
  } = useMutation(
    "bizcard/list",
    (params: GetBizCardListParams) =>
      getBizCardList(params).then(toBizCardUiModel),
    {
      onError: (error: ErrorDataModel) => {
        if (error?.code === 403) {
          queryClient.isFetching("user/session");
        } else {
          message.error(error?.data?.message || error.message);
        }
      },
    }
  );
  const onUpdateMemo = useCallback(
    async (params: PostBizCardParams) => {
      setStatus("loading");
      try {
        await postBizCard(params);
        message.success("등록이 완료 되었습니다.");
        setStatus("success");
        return true;
      } catch (e) {
        message.error((e as ErrorModel).response?.data?.message);
        setStatus("error");
        return false;
      }
    },
    [postBizCard]
  );
  const onTypeChange = useCallback(
    (type, index) => {
      const items = [...(bizCardList || [])];
      items[index].type = type;
      items[index].note = "";
      queryClient.setQueryData("bizcard/list", items);
    },
    [bizCardList]
  );
  const onNoteChange = useCallback(
    (note, index) => {
      const items = [...(bizCardList || [])];
      items[index].note = note;
      console.log(items);
      queryClient.setQueryData("bizcard/list", items);
    },
    [bizCardList]
  );
  return {
    bizCardList: bizCardList || [],
    status,
    loading: isListLoading || status === "loading",
    onUpdateMemo,
    onTypeChange,
    onNoteChange,
    onGetBizCardList: onBizcardList,
  };
};
