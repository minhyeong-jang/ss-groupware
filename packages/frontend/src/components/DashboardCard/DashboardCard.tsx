import { DashboardCardIcon } from "models";
import { FC } from "react";
import styled from "styled-components";

interface Props {
  icon: DashboardCardIcon;
  title: string;
}
export const DashboardCard: FC<Props> = ({
  icon,
  title,
  children,
  ...props
}) => {
  return (
    <StyledContainer {...props}>
      <StyledTitleWrap>
        <StyledIcon>{icon}</StyledIcon>
        <StyledTitle>{title}</StyledTitle>
      </StyledTitleWrap>
      <StyledContent>{children}</StyledContent>
    </StyledContainer>
  );
};
const StyledContainer = styled.div`
  position: relative;
  background-color: white;
  padding: 16px;
  border-radius: 8px;
`;
const StyledTitleWrap = styled.div`
  margin-bottom: 32px;
  display: flex;
  align-items: center;
`;
const StyledIcon = styled.span`
  font-size: 20px;
  margin-right: 10px;
`;
const StyledTitle = styled.div`
  font-size: 15px;
  font-weight: bold;
`;
const StyledContent = styled.div``;
