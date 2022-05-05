import { Button, Progress } from "antd";
import { FC } from "react";
import styled from "styled-components";
import { ContentLabel, ContentNotice } from "./ContentStyle";

export const TodayWork: FC = () => {
  // TODO: 출퇴근 버튼 연동
  return (
    <StyledContainer>
      <StyledContentWrap>
        <div>
          <ContentLabel>출근시간</ContentLabel>
          <StyledContentDesc>10:00</StyledContentDesc>
        </div>
        <StyledDivider>-</StyledDivider>
        <div>
          <ContentLabel>퇴근시간</ContentLabel>
          <StyledButton size='small' type='primary'>
            퇴근
          </StyledButton>
        </div>
      </StyledContentWrap>
      <ContentNotice>오늘 하루 힘내세요!</ContentNotice>
      <StyledProgress
        type='circle'
        width={60}
        strokeColor={{
          "0%": "#108ee9",
          "100%": "#87d068",
        }}
        percent={70}
      />
    </StyledContainer>
  );
};
const StyledContainer = styled.div``;
const StyledContentWrap = styled.div`
  display: flex;
  flex-direction: row;
`;
const StyledContentDesc = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.color.gray100};
`;
const StyledDivider = styled.div`
  margin: auto 12px;
  font-size: 13px;
  color: ${({ theme }) => theme.color.gray50};
`;
const StyledProgress = styled(Progress)`
  position: absolute;
  bottom: 32px;
  right: 16px;
`;
const StyledButton = styled(Button)`
  font-size: 12px;
`;
