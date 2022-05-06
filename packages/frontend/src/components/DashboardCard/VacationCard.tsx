import { DashboardCardIcon } from "models";
import { FC } from "react";
import { ContentLabel, ContentDesc, ContentNotice } from "./ContentStyle";
import { DashboardCard } from "./DashboardCard";

interface Props {
  restDay: number;
}
const returnMessage = (restDay: number) => {
  if (restDay > 5) {
    return "휴가 계획이 있나요?!";
  }
  if (restDay > 0) {
    return "비상🚨! 연말을 위해 아껴야해요.";
  }
  return "내년에 만나요...⭐️";
};
export const VacationCard: FC<Props> = ({ restDay }) => {
  return (
    <DashboardCard icon={DashboardCardIcon.VACATION} title='휴가'>
      <ContentLabel>남은 연차</ContentLabel>
      <ContentDesc>{restDay}일</ContentDesc>
      <ContentNotice>{returnMessage(restDay)}</ContentNotice>
    </DashboardCard>
  );
};
