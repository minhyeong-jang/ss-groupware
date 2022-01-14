import { message } from "antd";
import {
  postCheckin,
  PostCheckinParams,
  postCheckout,
  PostCheckoutParams,
} from "apis";
import { useCallback, useState } from "react";
import { ErrorModel } from "schema";

export const useOfficeCheck = () => {
  const [loading, setLoading] = useState(false);

  const onCheckin = useCallback(
    async (params: PostCheckinParams) => {
      setLoading(true);
      try {
        const res = await postCheckin(params);
        message.info(res.data.message);
        return res.data.message;
      } catch (e) {
        message.error((e as ErrorModel).response?.data?.message);
      } finally {
        setLoading(false);
      }
    },
    [postCheckin]
  );
  const onCheckout = useCallback(
    async (params: PostCheckoutParams) => {
      setLoading(true);
      try {
        const res = await postCheckout(params);
        message.info(res.data.message);
        return res.data.message;
      } catch (e) {
        message.error((e as ErrorModel).response?.data?.message);
      } finally {
        setLoading(false);
      }
    },
    [postCheckout]
  );

  return {
    loading,
    onCheckin,
    onCheckout,
  };
};
