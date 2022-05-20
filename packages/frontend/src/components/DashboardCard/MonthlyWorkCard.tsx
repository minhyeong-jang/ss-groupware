import { DashboardCardIcon, UserInfoMonthlyWorkModel } from "models";
import { FC } from "react";
import { ContentLabel, ContentDesc, ContentNotice } from "./ContentStyle";
import { DashboardCard } from "./DashboardCard";

interface Props {
  monthlyWork: UserInfoMonthlyWorkModel;
}
export const MonthlyWorkCard: FC<Props> = ({ monthlyWork }) => {
  return (
    <DashboardCard icon={DashboardCardIcon.RUN} title='월간 업무 내용'>
      <ContentLabel>
        근무시간 ( 법정 근로 시간 : {monthlyWork.officialHour}시간 )
      </ContentLabel>
      <ContentDesc>
        {monthlyWork.workHour}시간 {monthlyWork.workMinute}분
      </ContentDesc>
      <ContentNotice>
        근로시간은 휴가, 출퇴근 누락이 포함되지 않아요.
        <br />
        법정근로시간 = 영업일 기준(휴가 제외)*8
      </ContentNotice>
    </DashboardCard>
  );
};
