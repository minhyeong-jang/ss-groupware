import { message } from "antd";
import { Loading } from "components/@shared";
import { useOfficeCheck } from "hooks";
import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { BizCardContainer } from "./BizCardContainer";

export const IndexContainer: FC = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const { loading, onCheckin, onCheckout } = useOfficeCheck();

  const checkUserInfo = () => {
    if (!id) {
      message.info("아이디를 입력해주세요.");
      return false;
    }
    if (!pw) {
      message.error("패스워드를 입력해주세요.");
      return false;
    }
    localStorage.setItem("gw_musinsa_ss", JSON.stringify({ id, pw }));
    return true;
  };
  const onButtonClick = async (type: string) => {
    if (!checkUserInfo()) return;

    switch (type) {
      case "in":
        await onCheckin({ id, pw });
        break;
      case "out":
        await onCheckout({ id, pw });
        break;
    }
  };

  useEffect(() => {
    const storage = localStorage.getItem("gw_musinsa_ss");
    if (storage) {
      const { id, pw } = JSON.parse(storage);
      id && setId(id);
      pw && setPw(pw);
    }
  }, [setId]);

  return (
    <StyledContainer>
      <StyledFormWrap>
        <StyledTitle>StyleShare Groupware</StyledTitle>
        <StyledDesc>made by 장민형</StyledDesc>
        <StyledInputWrap>
          <StyledLabel>아이디 : </StyledLabel>
          <StyledInput value={id} onChange={(e) => setId(e.target.value)} />
        </StyledInputWrap>
        <StyledInputWrap>
          <StyledLabel>패스워드 : </StyledLabel>
          <StyledInput
            type='password'
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
        </StyledInputWrap>
        <StyledButtonWrap>
          <StyledButton onClick={() => onButtonClick("in")}>출근</StyledButton>
          <StyledButton onClick={() => onButtonClick("out")}>퇴근</StyledButton>
        </StyledButtonWrap>
        <BizCardContainer id={id} pw={pw} onCheckUserInfo={checkUserInfo} />
      </StyledFormWrap>
      {loading && <Loading />}
    </StyledContainer>
  );
};
const StyledContainer = styled.div`
  position: relative;
  min-height: 100vh;
  padding: 30px;
  background: #dedede;
`;
const StyledFormWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid ${({ theme }) => theme.color.gray100};
  padding: 30px;
  border-radius: 4px;
  background: #fff;
`;
const StyledTitle = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.color.gray100};
  font-size: 20px;
  font-weight: bold;
`;
const StyledDesc = styled.div`
  font-size: 12px;
  color: #aaa;
  margin: 5px auto 20px;
  text-align: center;
`;
const StyledInputWrap = styled.div`
  position: relative;
  color: ${({ theme }) => theme.color.gray100};
  border: 1px solid #999;
  border-radius: 4px;
  overflow: hidden;
  padding: 15px 20px;
  margin-bottom: 15px;
  font-size: 13px;
`;
const StyledLabel = styled.div`
  position: absolute;
  left: 15px;
  width: 55px;
  color: #999;
  text-align: right;
`;
const StyledInput = styled.input`
  padding-left: 55px;
  outline: none;
`;
const StyledButtonWrap = styled.div`
  display: grid;
  grid-gap: 5px;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 5px;
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
const StyledAuthButton = styled.button`
  border-radius: 4px;
  width: 100%;
  border: 1px solid white;
  background: ${({ theme }) => theme.color.blue};
  color: white;
  padding: 10px;
  outline: none;
  font-size: 14px;
  border: 1px solid #;
`;
