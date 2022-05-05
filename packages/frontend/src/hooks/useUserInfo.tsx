import { message } from "antd";
import { postUserLogin } from "apis";
import { useMutation } from "react-query";
import { ErrorModel } from "schema";

export const useUserInfo = () => {
  const { mutateAsync: onLogin, isLoading: isLoginLoading } = useMutation(
    postUserLogin,
    {
      onSuccess: (res) => {
        console.log(res);
        message.success(res.data.message);
      },
      onError: (error: ErrorModel) => {
        message.error(error.response?.data?.message);
      },
    }
  );
  return {
    onLogin,
    isLoading: isLoginLoading,
  };
};
