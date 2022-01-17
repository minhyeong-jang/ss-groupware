import React, { FC } from "react";
import styled from "styled-components";

export const BizCardNotice: FC = () => {
  return (
    <StyledContainer>
      <StyledTitle>유의사항</StyledTitle>
      <StyledList>
        <li>
          점심식대는 <b>본인 외 인원 수</b>를 입력해야합니다. ( 혼자 식사한 경우
          0을 입력해주세요. )
        </li>
        <li>
          야근식대는 <b>함께 식사한 모든 사람의 이름</b>을 입력해야합니다.
        </li>
        <li>
          야근교통비는 <b>출발지, 도착지</b>를 입력해야합니다.
        </li>
      </StyledList>
    </StyledContainer>
  );
};
const StyledContainer = styled.div`
  margin-top: 30px;
`;
const StyledTitle = styled.div`
  font-weight: bold;
  font-size: 16px;
`;
const StyledList = styled.ul`
  color: #999;
  font-size: 14px;
  margin-top: 15px;

  li {
    position: relative;
    margin-bottom: 8px;
    padding-left: 9px;
    color: rgb(117, 125, 134);
    font-size: 0.8125rem;
    line-height: 18px;
    word-break: keep-all;

    &::before {
      position: absolute;
      left: 0px;
      font-weight: bold;
      content: "·";
    }
  }
`;
