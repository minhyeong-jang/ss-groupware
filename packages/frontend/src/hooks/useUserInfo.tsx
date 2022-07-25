import { message } from "antd";
import {
  getUserInfo,
  getUserSession,
  postUserLogin,
  postOfficeCheck,
  ErrorModel,
} from "apis";
import { convertUserInfoModel } from "models/userInfo.model";
import { useQueryClient, useMutation, useQuery } from "react-query";

export const useUserInfo = () => {
  const queryClient = useQueryClient();

  const {
    data: hasSession,
    isLoading: isSessionLoading,
    refetch: onSessionRefetch,
    isRefetching: isSessionRefetching,
  } = useQuery("user/session", getUserSession, {
    onError: () => {
      queryClient.setQueryData("user/session", false);
    },
  });
  const {
    data: userInfo,
    isLoading: isUserInfoLoading,
    refetch: onProfileRefetch,
    isRefetching: isUserInfoRefetching,
  } = useQuery("user/profile", getUserInfo, {
    enabled: hasSession || false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    onError: (error: ErrorModel) => {
      if (error?.status === 403) {
        onSessionRefetch();
      } else {
        message.error(error?.data?.message || error.message);
      }
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
      onError: (error: ErrorModel) => {
        if (error?.status === 403) {
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
      onError: (error: ErrorModel) => {
        if (error?.status === 403) {
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
      isLoginLoading ||
      isCheckLoading ||
      isSessionLoading ||
      isUserInfoLoading ||
      isSessionRefetching ||
      isUserInfoRefetching,
  };
};
