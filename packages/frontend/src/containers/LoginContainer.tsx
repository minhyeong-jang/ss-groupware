import { Button, Form, message } from "antd";
import { Loading } from "components/@shared";
import { ContentNotice } from "components/DashboardCard";
import { UserForm } from "components/UserForm";
import { useUserInfo } from "hooks";
import { FC, useEffect, useState } from "react";
import { CompanyType, UserInfoSchema } from "schema";
import styled from "styled-components";

export const LoginContainer: FC = () => {
  const { hasSession, isSessionLoading, isLoading, onLogin } = useUserInfo();
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
    localStorage.setItem("gw_musinsa_ss", JSON.stringify(userInfo));
    onLogin(userInfo);
  };

  useEffect(() => {
    try {
      if (!hasSession && !isSessionLoading) {
        const storage = localStorage.getItem("gw_musinsa_ss");
        if (storage) {
          const {
            id = "",
            pw = "",
            type = CompanyType.MUSINSA,
          } = JSON.parse(storage);
          setUserInfo({ id, pw, type });
          onLogin({ id, pw, type });
        } else {
          setUserInfo({ id: "", pw: "", type: CompanyType.MUSINSA });
        }
      }
    } catch {
      localStorage.removeItem("gw_musinsa_ss");
    }
  }, [hasSession, isSessionLoading]);

  if (hasSession || isSessionLoading) {
    return null;
  }

  return (
    <StyledPopup>
      <StyledPopupBody>
        <StyledTitle>
          <StyledIcon>😢</StyledIcon> 로그인 후 이용 가능해요
        </StyledTitle>
        <Form>
          <UserForm
            userInfo={userInfo}
            onChange={(key: string, value: string) =>
              setUserInfo((prevState) => ({ ...prevState, [key]: value }))
            }
          />
          <StyledButton
            type='primary'
            onClick={checkUserInfo}
            onSubmit={checkUserInfo}
            htmlType='submit'
          >
            로그인
          </StyledButton>
        </Form>
        <ContentNotice>
          - 아이디 및 패스워드는 해당 기기에만 저장됩니다.
          <br />- 유저 정보는 그룹웨어에서 불러오며, 별도로 저장하지 않습니다.
        </ContentNotice>
      </StyledPopupBody>
      {isLoading && <Loading />}
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
