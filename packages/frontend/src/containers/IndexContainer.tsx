import { Button, message, Modal, Result } from "antd";
import { Loading } from "components/@shared";
import { Header, UserForm } from "components/UserForm";
import { useOfficeCheck } from "hooks";
import React, { FC, useEffect, useState } from "react";
import { CompanyType, UserInfoSchema } from "schema";
import styled from "styled-components";
import { BizCardContainer } from "./BizCardContainer";

export const IndexContainer: FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfoSchema>({
    id: "",
    pw: "",
    type: CompanyType.MUSINSA,
  });
  const [alertVisible, setAlertVisible] = useState(true);
  const { loading, onCheckin, onCheckout } = useOfficeCheck();

  const checkUserInfo = () => {
    if (!userInfo.id) {
      message.info("아이디를 입력해주세요.");
      return false;
    }
    if (!userInfo.pw) {
      message.error("패스워드를 입력해주세요.");
      return false;
    }
    localStorage.setItem("gw_musinsa_ss", JSON.stringify(userInfo));
    return true;
  };
  const onButtonClick = async (type: string) => {
    if (!checkUserInfo()) return;

    switch (type) {
      case "in":
        window?.gtag("event", "click_check_in", { id: userInfo.id });
        await onCheckin(userInfo);
        break;
      case "out":
        window?.gtag("event", "click_check_out", { id: userInfo.id });
        await onCheckout(userInfo);
        break;
    }
  };

  useEffect(() => {
    // TODO : 세션스토리지나 쿠키로 변경
    const storage = localStorage.getItem("gw_musinsa_ss");

    if (storage) {
      const { id, pw, type } = JSON.parse(storage);
      setUserInfo({
        id: id || "",
        pw: pw || "",
        type: type || CompanyType.MUSINSA,
      });
    }
  }, []);

  return (
    <>
      <Modal
        visible={alertVisible}
        cancelButtonProps={{ style: { display: "none" } }}
        destroyOnClose={false}
        onOk={() => setAlertVisible(false)}
        onCancel={() => setAlertVisible(false)}
      >
        <Result
          status='info'
          title='출퇴근 페이지가 변경됩니다.'
          subTitle='5/15 이후로 해당 페이지는 삭제됩니다.'
          extra={[
            <Button
              type='primary'
              key='console'
              onClick={() => window.open("https://www.ss-groupware.com")}
            >
              https://www.ss-groupware.com
            </Button>,
          ]}
        />
      </Modal>
      <StyledContainer>
        <StyledFormWrap>
          <Header />
          <UserForm
            userInfo={userInfo}
            onChange={(key: string, value: string) =>
              setuserInfo((prevState) => ({ ...prevState, [key]: value }))
            }
          />
          <StyledButtonWrap>
            <StyledButton onClick={() => onButtonClick("in")}>
              출근
            </StyledButton>
            <StyledButton onClick={() => onButtonClick("out")}>
              퇴근
            </StyledButton>
          </StyledButtonWrap>
        </StyledFormWrap>
        {loading && <Loading />}
      </StyledContainer>
    </>
  );
};
const StyledContainer = styled.div`
  position: relative;
  min-height: 100vh;
  padding: 30px;
  background-image: linear-gradient(137deg, #0d5afd85 0%, #ff730000 40%),
    linear-gradient(225deg, #0dfd9c85 0%, #69a1ec00 40%),
    linear-gradient(45deg, #0be3c985 0%, #ff64ff00 40%),
    linear-gradient(270deg, #00d3fa, #0be3c9);
`;
const StyledFormWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 15px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 5px 12px rgb(123, 131, 143);
  max-width: 425px;
  width: 90%;
`;
const StyledButtonWrap = styled.div`
  display: grid;
  grid-gap: 5px;
  grid-template-columns: 1fr 1fr;
  margin: 0 0 5px;
`;
const StyledButton = styled.button<{ $color?: string }>`
  border-radius: 4px;
  width: 100%;
  border: 1px solid white;
  background: ${({ theme }) => theme.color.gray100};
  color: white;
  padding: 10px;
  outline: none;
  font-size: 14px;
  border: 1px solid #dedede;
`;
