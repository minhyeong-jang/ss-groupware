import { FC } from "react";
import styled from "styled-components";
import moment from "moment";

export const DashboardHeader: FC = () => {
  return (
    <StyledContainer>
      <StyledDate>{moment().format("M월 D일 dddd")}</StyledDate>
    </StyledContainer>
  );
};
const StyledContainer = styled.div`
  position: relative;
  background-color: white;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
`;
const StyledDate = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.color.gray60};
`;
