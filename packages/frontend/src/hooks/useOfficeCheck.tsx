import { message } from "antd";
import {
  postCheckin,
  PostCheckinParams,
  postCheckout,
  PostCheckoutParams,
} from "apis";
import { useCallback } from "react";
import { ErrorModel } from "schema";

export const useOfficeCheck = () => {
  const onCheckin = useCallback(
    async (params: PostCheckinParams) => {
      try {
        const res = await postCheckin(params);
        message.info(res.data.message);
        return res.data.message;
      } catch (e) {
        message.error((e as ErrorModel).response?.data?.message);
      }
    },
    [postCheckin]
  );
  const onCheckout = useCallback(
    async (params: PostCheckoutParams) => {
      try {
        const res = await postCheckout(params);
        message.info(res.data.message);
        return res.data.message;
      } catch (e) {
        message.error((e as ErrorModel).response?.data?.message);
      }
    },
    [postCheckout]
  );

  return {
    onCheckin,
    onCheckout,
  };
};
