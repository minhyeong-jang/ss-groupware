import { message } from "antd";
import { getUserInfo, getUserSession, postUserLogin } from "apis";
import { useMutation, useQuery } from "react-query";
import { ErrorModel } from "schema";

export const useUserInfo = () => {
  const { data: hasSession, refetch } = useQuery(
    "user/session",
    getUserSession,
    {
      refetchInterval: 600000,
    }
  );
  const { data: userInfo } = useQuery("user/profile", getUserInfo, {
    enabled: hasSession || false,
  });
  console.log(userInfo);

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
    userInfo,
    hasSession,
    refetch,
    onLogin,
    isLoading: isLoginLoading,
  };
};
