import { message } from "antd";
import {
  getUserInfo,
  getUserSession,
  postUserLogin,
  postOfficeCheck,
  ErrorDataModel,
} from "apis";
import { convertUserInfoModel } from "models/userInfo.model";
import { useQueryClient, useMutation, useQuery } from "react-query";

export const useUserInfo = () => {
  const queryClient = useQueryClient();

  const {
    data: hasSession,
    isLoading: isSessionLoading,
    refetch: onSessionRefetch,
  } = useQuery("user/session", getUserSession, {
    refetchInterval: 600000,
    onError: () => {
      queryClient.setQueryData("user/session", false);
    },
  });
  const {
    data: userInfo,
    isLoading: isUserInfoLoading,
    refetch: onProfileRefetch,
  } = useQuery("user/profile", getUserInfo, {
    enabled: hasSession || false,
    onError: () => {
      onSessionRefetch();
    },
  });

  const { mutateAsync: onLogin, isLoading: isLoginLoading } = useMutation(
    postUserLogin,
    {
      onSuccess: (res) => {
        onSessionRefetch();
        onProfileRefetch();
        message.success(res.message);
      },
      onError: (error: ErrorDataModel) => {
        if (error?.code === 403) {
          onSessionRefetch();
        } else {
          message.error(error?.data?.message || error.message);
        }
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
        if (error?.code === 403) {
          onSessionRefetch();
        } else {
          message.error(error?.data?.message || error.message);
        }
      },
    }
  );

  return {
    userInfo: convertUserInfoModel(userInfo),
    hasSession,
    onProfileRefetch,
    onOfficeCheck,
    onLogin,
    isSessionLoading,
    isLoading:
      isLoginLoading || isCheckLoading || isSessionLoading || isUserInfoLoading,
  };
};
