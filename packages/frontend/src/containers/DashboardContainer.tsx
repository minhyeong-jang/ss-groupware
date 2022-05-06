import {
  BizHistoryCard,
  DashboardCard,
  TodayWorkCard,
  VacationCard,
  WeeklyWorkCard,
} from "components/DashboardCard";
import { DashboardHeader } from "components/DashboardHeader";
import { useUserInfo } from "hooks";
import { FC } from "react";
import styled from "styled-components";

export const DashboardContainer: FC = () => {
  const { isLoading, userInfo } = useUserInfo();

  return (
    <StyledContainer>
      <DashboardHeader
        workToday={userInfo.workToday}
        profile={userInfo.profile}
      />
      <StyledCardWrap>
        <TodayWorkCard workToday={userInfo.workToday} />
        <WeeklyWorkCard restDay={userInfo?.restDay || 0} />
        <BizHistoryCard />
        <VacationCard restDay={userInfo?.restDay || 0} />
      </StyledCardWrap>
    </StyledContainer>
  );
};
const StyledContainer = styled.div`
  padding: 0;
  max-width: 720px;
  margin: 0 auto;
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
