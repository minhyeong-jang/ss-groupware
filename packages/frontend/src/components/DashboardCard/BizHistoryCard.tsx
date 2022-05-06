import { Button } from "antd";
import { DashboardCardIcon } from "models";
import { FC } from "react";
import styled from "styled-components";
import { ContentDesc, ContentLabel } from "./ContentStyle";
import { DashboardCard } from "./DashboardCard";

export const BizHistoryCard: FC = () => {
  return (
    <DashboardCard
      icon={DashboardCardIcon.BIZCARD}
      title='법인카드 ( 준비 중 )'
    >
      <ContentLabel>카드 사용 금액</ContentLabel>
      <ContentDesc>120,000원</ContentDesc>
      <StyledButton size='small' type='primary'>
        지출내역 작성
      </StyledButton>
    </DashboardCard>
  );
};

const StyledButton = styled(Button)`
  position: absolute;
  right: 16px;
  bottom: 16px;
  font-size: 12px;
`;
