import { Button } from "antd";
import { DashboardCardIcon } from "models";
import { FC } from "react";
import styled from "styled-components";
import { ContentDesc, ContentLabel, ContentNotice } from "./ContentStyle";
import { DashboardCard } from "./DashboardCard";

interface Props {
  totalPrice: number;
  onVisibleModal(): void;
}
export const BizHistoryCard: FC<Props> = ({ totalPrice, onVisibleModal }) => {
  return (
    <DashboardCard icon={DashboardCardIcon.BIZCARD} title='법인카드'>
      <StyledDiv>
        <ContentLabel>카드 사용 금액</ContentLabel>
        <ContentDesc>{totalPrice?.toLocaleString()}원</ContentDesc>
        <StyledButton type='primary' onClick={onVisibleModal}>
          지출내역 작성
        </StyledButton>
      </StyledDiv>
      <ContentNotice>
        지출내역을 작성 후 그룹웨어에서 기안을 올려주세요!
      </ContentNotice>
    </DashboardCard>
  );
};

const StyledButton = styled(Button)`
  position: absolute;
  right: 0px;
  top: 3px;
  font-size: 12px;
`;
const StyledDiv = styled.div`
  position: relative;
`;
