import { Button } from "antd";
import { DashboardCardIcon } from "models";
import { FC } from "react";
import styled from "styled-components";
import { ContentDesc, ContentLabel } from "./ContentStyle";
import { DashboardCard } from "./DashboardCard";

interface Props {
  totalPrice: number;
  onVisibleModal(): void;
}
export const BizHistoryCard: FC<Props> = ({ totalPrice, onVisibleModal }) => {
  return (
    <DashboardCard icon={DashboardCardIcon.BIZCARD} title='법인카드'>
      <ContentLabel>카드 사용 금액</ContentLabel>
      <ContentDesc>{totalPrice?.toLocaleString()}원</ContentDesc>
      <StyledButton type='primary' onClick={onVisibleModal}>
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
