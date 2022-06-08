import { DashboardCardIcon, UserInfoMonthlyNoticeModel } from "models";
import React, { FC } from "react";
import styled from "styled-components";
import { ContentDesc, ContentLabel, ContentNotice } from "./ContentStyle";
import { DashboardCard } from "./DashboardCard";

interface Props {
  notices: UserInfoMonthlyNoticeModel[];
}
export const WorkNoticeCard: FC<Props> = ({ notices }) => {
  return (
    <DashboardCard icon={DashboardCardIcon.NOTICE} title='월간 정보'>
      <ContentLabel>월간 인사 정보</ContentLabel>
      <ContentDesc>
        {notices.length ? (
          notices.map((note, index) => (
            <StyledNotice key={index}>
              {note.date} - {note.message}
            </StyledNotice>
          ))
        ) : (
          <ContentNotice>특별한 내용이 없어요!</ContentNotice>
        )}
      </ContentDesc>
    </DashboardCard>
  );
};

const StyledNotice = styled.div`
  line-height: 1.6;
  font-size: 13px;
  color: ${({ theme }) => theme.color.gray70};
`;
