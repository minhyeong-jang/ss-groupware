import React, { FC } from "react";
import styled from "styled-components";

export const IndexContainer: FC = () => {
  return (
    <StyledContainer>
      <StyledTitle>MUSINSA & StyleShare Groupware</StyledTitle>
      <StyledFormWrap>
        <StyledInputWrap>
          <StyledLabel>아이디 : </StyledLabel>
          <StyledInput />
        </StyledInputWrap>
        <StyledInputWrap>
          <StyledLabel>패스워드 : </StyledLabel>
          <StyledInput />
        </StyledInputWrap>
      </StyledFormWrap>
      <StyledButton>출근</StyledButton>
    </StyledContainer>
  );
};
const StyledContainer = styled.div`
  position: relative;
  min-height: 100vh;
  padding: 30px;
  background: white;
`;
const StyledTitle = styled.div`
  text-align: center;
  color: #000;
  font-size: 25px;
  font-weight: bold;
`;
const StyledFormWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #dedede;
  padding: 30px;
`;
const StyledInputWrap = styled.div`
  position: relative;
  color: white;
  border: 1px solid white;
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
  text-align: right;
`;
const StyledInput = styled.input`
  padding-left: 33px;
  outline: none;
`;
const StyledButton = styled.button`
  border-radius: 4px;
  border: 1px solid white;
  background: none;
  padding: 20px;
  outline: none;
`;
