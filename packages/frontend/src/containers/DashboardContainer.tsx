import { Loading } from "components/@shared";
import {
  BizHistoryCard,
  TodayWorkCard,
  VacationCard,
  WeeklyWorkCard,
} from "components/DashboardCard";
import { DashboardHeader } from "components/DashboardHeader";
import { useUserInfo } from "hooks";
import { FC } from "react";
import styled from "styled-components";

export const DashboardContainer: FC = () => {
  const { isLoading, onOfficeCheck, userInfo } = useUserInfo();

  const onCheck = async (type: string) => {
    switch (type) {
      case "in":
        window?.gtag("event", "click_check_in", {
          id: userInfo.profile.userName,
        });
        await onOfficeCheck({ type: "1" });
        break;
      case "out":
        window?.gtag("event", "click_check_out", {
          id: userInfo.profile.userName,
        });
        await onOfficeCheck({ type: "4" });
        break;
    }
  };
  return (
    <StyledContainer>
      <DashboardHeader
        workToday={userInfo.workToday}
        profile={userInfo.profile}
        onCheck={onCheck}
      />
      <StyledCardWrap>
        <TodayWorkCard workToday={userInfo.workToday} />
        <VacationCard restDay={userInfo.restDay || 0} />
        <BizHistoryCard totalPrice={userInfo.bizcardTotalPrice} />
        <WeeklyWorkCard restDay={userInfo.restDay || 0} />
      </StyledCardWrap>
      <StyledDeveloper>Made by doriri</StyledDeveloper>
      {isLoading && <Loading />}
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
