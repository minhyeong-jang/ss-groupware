import { Button, Progress } from "antd";
import { DashboardCardIcon, UserInfoWorkTodayModel } from "models";
import { FC } from "react";
import styled from "styled-components";
import { ContentLabel, ContentNotice } from "./ContentStyle";
import { DashboardCard } from "./DashboardCard";

interface Props {
  workToday: UserInfoWorkTodayModel;
}
export const TodayWorkCard: FC<Props> = ({ workToday }) => {
  // TODO: 출퇴근 버튼 연동
  return (
    <DashboardCard icon={DashboardCardIcon.TIME} title='오늘의 출근'>
      <StyledContentWrap>
        <div>
          <ContentLabel>출근시간</ContentLabel>
          <StyledContentDesc>{workToday.comeAt || "출근 중"}</StyledContentDesc>
        </div>
        <StyledDivider>-</StyledDivider>
        <div>
          <ContentLabel>퇴근시간</ContentLabel>
          <StyledContentDesc>
            {workToday.leaveAt || (workToday.comeAt ? "업무 중" : "")}
          </StyledContentDesc>
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
        percent={workToday.progressPercent}
      />
    </DashboardCard>
  );
};
const StyledContentWrap = styled.div`
  display: flex;
  flex-direction: row;
`;
const StyledContentDesc = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.color.gray100};
`;
const StyledDivider = styled.div`
  margin: 20px 12px 0;
  font-size: 13px;
  color: ${({ theme }) => theme.color.gray50};
`;
const StyledProgress = styled(Progress)`
  position: absolute;
  bottom: 32px;
  right: 16px;
`;
