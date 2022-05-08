import { message } from "antd";
import {
  getUserInfo,
  getUserSession,
  postUserLogin,
  postOfficeCheck,
  ErrorDataModel,
} from "apis";
import { convertUserInfoModel } from "models/userInfo.model";
import { useMutation, useQuery } from "react-query";

export const useUserInfo = () => {
  const {
    data: hasSession,
    isLoading: isSessionLoading,
    refetch: onSessionRefetch,
  } = useQuery("user/session", getUserSession, {
    refetchInterval: 600000,
  });
  const {
    data: userInfo,
    isLoading: isUserInfoLoading,
    refetch: onProfileRefetch,
  } = useQuery("user/profile", getUserInfo, {
    enabled: hasSession || false,
  });

  const { mutateAsync: onLogin, isLoading: isLoginLoading } = useMutation(
    postUserLogin,
    {
      onSuccess: (res) => {
        message.success(res.message);
        onSessionRefetch();
        onProfileRefetch();
      },
      onError: (error: ErrorDataModel) => {
        message.error(error.data.message);
      },
    }
  );
  const { mutateAsync: onOfficeCheck, isLoading: isCheckLoading } = useMutation(
    postOfficeCheck,
    {
      onSuccess: (res) => {
        onProfileRefetch();
        message.success(res.message);
      },
      onError: (error: ErrorDataModel) => {
        message.error(error.data.message);
      },
    }
  );

  return {
    userInfo: convertUserInfoModel(userInfo),
    hasSession,
    onOfficeCheck,
    onLogin,
    isSessionLoading,
    isLoading:
      isLoginLoading || isCheckLoading || isSessionLoading || isUserInfoLoading,
  };
};
