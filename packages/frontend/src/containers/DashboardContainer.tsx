import {
  BizHistoryCard,
  TodayWorkCard,
  VacationCard,
  MonthlyWorkCard,
} from "components/DashboardCard";
import { WorkNoticeCard } from "components/DashboardCard/WorkNoticeCard";
import { DashboardHeader } from "components/DashboardHeader";
import { initUserInfoModel } from "models";
import { FC } from "react";
import styled from "styled-components";

const userInfo = initUserInfoModel;

export const DashboardContainer: FC = () => {
  return (
    <StyledContainer>
      <DashboardHeader
        workToday={userInfo.workToday}
        profile={userInfo.profile}
        onCheck={() => {}}
        onLogout={() => {}}
      />
      <StyledCardWrap>
        <TodayWorkCard workToday={userInfo.workToday} />
        <VacationCard restDay={userInfo.restDay || 0} />
        <BizHistoryCard
          onVisibleModal={() => {}}
          totalPrice={userInfo.bizCardTotalPrice}
        />
        <MonthlyWorkCard monthlyWork={userInfo.monthlyWork} />
        <WorkNoticeCard notices={userInfo.notices} />
      </StyledCardWrap>
      <StyledDeveloper>Made by Styleshare.react</StyledDeveloper>
      {/* {visibleBizCard && (
        <BizCardContainer onClose={() => setVisibleBizCard(false)} />
      )} */}
    </StyledContainer>
  );
};
const StyledContainer = styled.div`
  padding: 0;
  max-width: 720px;
  margin: 0 auto;
`;
const StyledDeveloper = styled.div`
  text-align: center;
  margin-top: 16px;
  font-size: 13px;
  color: #0d1652;
`;
const StyledCardWrap = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(1, 1fr);

  ${({ theme }) => theme.mediaQuery.md} {
    grid-template-columns: repeat(2, 1fr);
  }
  /* ${({ theme }) => theme.mediaQuery.lg} {
    grid-template-columns: repeat(3, 1fr);
  } ; */
`;
