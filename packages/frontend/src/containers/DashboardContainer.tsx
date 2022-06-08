import { Loading } from "components/@shared";
import {
  BizHistoryCard,
  TodayWorkCard,
  VacationCard,
  MonthlyWorkCard,
} from "components/DashboardCard";
import { WorkNoticeCard } from "components/DashboardCard/WorkNoticeCard";
import { DashboardHeader } from "components/DashboardHeader";
import { useUserInfo } from "hooks";
import { FC, useState } from "react";
import styled from "styled-components";
import { BizCardContainer } from "./BizCardContainer";

export const DashboardContainer: FC = () => {
  const { isLoading, onOfficeCheck, userInfo } = useUserInfo();
  const [visibleBizCard, setVisibleBizCard] = useState(false);

  const onCheck = async (type: string) => {
    switch (type) {
      case "in":
        window?.gtag("event", "click_check_in", {
          id: `${userInfo.profile.deptName}_${userInfo.profile.userName}`,
        });
        await onOfficeCheck({ type: "1" });
        break;
      case "out":
        window?.gtag("event", "click_check_out", {
          id: `${userInfo.profile.deptName}_${userInfo.profile.userName}`,
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
        <BizHistoryCard
          onVisibleModal={() => setVisibleBizCard(true)}
          totalPrice={userInfo.bizCardTotalPrice}
        />
        <MonthlyWorkCard monthlyWork={userInfo.monthlyWork} />
        <WorkNoticeCard notices={userInfo.notices} />
      </StyledCardWrap>
      <StyledDeveloper>Made by doriri</StyledDeveloper>
      {isLoading && <Loading />}
      {visibleBizCard && (
        <BizCardContainer
          onClose={() => setVisibleBizCard(false)}
          userName={userInfo.profile.userName}
        />
      )}
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
