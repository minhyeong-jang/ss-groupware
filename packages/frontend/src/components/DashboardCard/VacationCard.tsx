import { DashboardCardIcon } from "models";
import { FC } from "react";
import { ContentLabel, ContentDesc, ContentNotice } from "./ContentStyle";
import { DashboardCard } from "./DashboardCard";

export const VacationCard: FC = () => {
  return (
    <DashboardCard icon={DashboardCardIcon.VACATION} title='휴가'>
      <ContentLabel>남은 연차</ContentLabel>
      <ContentDesc>15.0일</ContentDesc>
    </DashboardCard>
  );
};
