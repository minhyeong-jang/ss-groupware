import { DashboardCardIcon } from "models";
import { FC } from "react";
import { ContentLabel, ContentDesc } from "./ContentStyle";
import { DashboardCard } from "./DashboardCard";

interface Props {
  restDay: number;
}
export const WeeklyWorkCard: FC<Props> = ({ restDay }) => {
  return (
    <DashboardCard
      icon={DashboardCardIcon.RUN}
      title='주간 업무 시간 ( 작업 중 )'
    >
      <ContentLabel>근무시간</ContentLabel>
      <ContentDesc>99시간 99분</ContentDesc>
      {/* <StyledProgress type='circle' width={60} percent={70} /> */}
    </DashboardCard>
  );
};
// const StyledProgress = styled(Progress)`
//   position: absolute;
//   bottom: 10px;
//   right: 16px;
// `;
