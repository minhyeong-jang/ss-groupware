import { message } from "antd";
import { getUserSession, postUserLogin, PostUserLoginResponse } from "apis";
import { useMutation, useQuery } from "react-query";
import { ErrorModel } from "schema";

export const useUserInfo = () => {
  const { data: hasSession, refetch } = useQuery(
    "user/session",
    getUserSession
  );

  const { mutateAsync: onLogin, isLoading: isLoginLoading } = useMutation(
    postUserLogin,
    {
      onSuccess: (res) => {
        message.success(res.message);
      },
      onError: (error: ErrorModel) => {
        message.error(error.response?.data?.message);
      },
    }
  );
  return {
    hasSession,
    refetch,
    onLogin,
    isLoading: isLoginLoading,
  };
};
