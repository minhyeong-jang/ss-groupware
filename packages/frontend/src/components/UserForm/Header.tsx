import React, { FC } from "react";
import styled from "styled-components";

export const Header: FC = () => {
  return (
    <StyledTitleWrap>
      <StyledTitle>StyleShare Groupware</StyledTitle>
      <StyledDesc>made by 장민형</StyledDesc>
    </StyledTitleWrap>
  );
};
const StyledTitleWrap = styled.div`
  margin: 5px auto 20px;
`;
const StyledTitle = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.color.gray100};
  font-size: 20px;
  margin-bottom: 5px;
  font-weight: bold;
`;
const StyledDesc = styled.div`
  font-size: 12px;
  color: #aaa;
  margin: 0 auto;
  text-align: center;
`;
