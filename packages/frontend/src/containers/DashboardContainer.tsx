import {
  BizHistoryCard,
  DashboardCard,
  TodayWork,
  VacationCard,
  WeeklyWorkCard,
} from "components/DashboardCard";
import { DashboardCardIcon } from "models";
import { FC } from "react";
import styled from "styled-components";

export const DashboardContainer: FC = () => {
  return (
    <StyledContainer>
      <StyledCardWrap>
        <DashboardCard icon={DashboardCardIcon.TIME} title='오늘의 출근'>
          <TodayWork />
        </DashboardCard>
        <WeeklyWorkCard />
        <BizHistoryCard />
        <VacationCard />
      </StyledCardWrap>
    </StyledContainer>
  );
};
const StyledContainer = styled.div`
  padding: 0;
`;
const StyledCardWrap = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(1, 1fr);

  ${({ theme }) => theme.mediaQuery.md} {
    grid-template-columns: repeat(2, 1fr);
  }
  ${({ theme }) => theme.mediaQuery.lg} {
    grid-template-columns: repeat(3, 1fr);
  } ;
`;
