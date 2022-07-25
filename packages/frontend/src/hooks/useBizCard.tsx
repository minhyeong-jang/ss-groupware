import { message } from "antd";
import {
  ErrorModel,
  getBizCardList,
  GetBizCardListParams,
  postBizCard,
} from "apis";
import { toBizCardUiModel } from "models";
import { useMemo } from "react";
import { useMutation, useQueryClient } from "react-query";

export const useBizCard = () => {
  const queryClient = useQueryClient();

  const {
    data: bizCardList,
    mutateAsync: onBizcardList,
    isLoading: isListLoading,
  } = useMutation(
    "bizcard/list",
    (params: GetBizCardListParams) =>
      getBizCardList(params).then(toBizCardUiModel),
    {
      onError: (error: ErrorModel) => {
        if (error?.status === 403) {
          queryClient.setQueryData("user/session", false);
        } else {
          message.error(error?.data?.message || error.message);
        }
      },
    }
  );

  const { mutateAsync: onBizcardSubmit, isLoading: isSubmitLoading } =
    useMutation(postBizCard, {
      onSuccess: (res) => {
        message.success(res.message);
      },
      onError: (error: ErrorModel) => {
        if (error?.status === 403) {
          queryClient.setQueryData("user/session", false);
        } else {
          message.error(error?.data?.message || error.message);
        }
      },
    });

  const isLoading = useMemo(
    () => isListLoading || isSubmitLoading,
    [isListLoading, isSubmitLoading]
  );
  return {
    bizCardList: bizCardList || [],
    isLoading,
    onBizcardSubmit,
    onGetBizCardList: onBizcardList,
  };
};
