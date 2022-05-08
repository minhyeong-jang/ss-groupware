import { Button, message } from "antd";
import { UserForm } from "components/UserForm";
import { useUserInfo } from "hooks";
import { FC, useEffect, useState } from "react";
import { CompanyType, UserInfoSchema } from "schema";
import styled from "styled-components";

export const LoginContainer: FC = () => {
  const { hasSession, isSessionLoading, onLogin } = useUserInfo();
  const [userInfo, setUserInfo] = useState<UserInfoSchema>({
    id: "",
    pw: "",
    type: CompanyType.MUSINSA,
  });

  const checkUserInfo = async () => {
    if (!userInfo.id) {
      message.info("아이디를 입력해주세요.");
      return false;
    }
    if (!userInfo.pw) {
      message.error("패스워드를 입력해주세요.");
      return false;
    }
    sessionStorage.setItem("gw_musinsa_ss", JSON.stringify(userInfo));
    onLogin(userInfo);
  };

  useEffect(() => {
    try {
      const storage = sessionStorage.getItem("gw_musinsa_ss");
      if (storage) {
        const { id, pw, type } = JSON.parse(storage);
        setUserInfo({
          id: id || "",
          pw: pw || "",
          type: type || CompanyType.MUSINSA,
        });
      }
    } catch {
      sessionStorage.removeItem("gw_musinsa_ss");
    }
  }, []);

  console.log(hasSession);
  if (hasSession || isSessionLoading) {
    return null;
  }

  return (
    <StyledPopup>
      <StyledPopupBody>
        <StyledTitle>
          <StyledIcon>😢</StyledIcon> 로그인 후 이용 가능해요
        </StyledTitle>
        <UserForm
          userInfo={userInfo}
          onChange={(key: string, value: string) =>
            setUserInfo((prevState) => ({ ...prevState, [key]: value }))
          }
        />
        <StyledButton type='primary' onClick={() => checkUserInfo()}>
          로그인
        </StyledButton>
      </StyledPopupBody>
    </StyledPopup>
  );
};

const StyledPopup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  padding: 16px;

  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    backdrop-filter: blur(8px);
    background-color: rgba(0, 0, 0, 0.3);
  }
`;
const StyledPopupBody = styled.div`
  position: absolute;
  max-width: 520px;
  width: calc(100% - 32px);
  border: 1px solid #dedede;
  background-color: white;
  padding: 16px;
  left: 50%;
  right: initial;
  top: 50%;
  bottom: initial;
  border-radius: 8px;
  transform: translate(-50%, -50%);
`;
const StyledTitle = styled.div`
  text-align: center;
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: bold;
`;
const StyledIcon = styled.div`
  font-size: 35px;
  margin-bottom: 8px;
`;
const StyledButton = styled(Button)<{ $color?: string }>`
  border-radius: 4px;
  width: 100%;
  outline: none;
  font-size: 14px;
  height: 36px;
  padding: 0;
`;
