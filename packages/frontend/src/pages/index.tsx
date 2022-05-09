import { DashboardContainer, LoginContainer } from "containers";
import { FC } from "react";
import styled from "styled-components";

const index: FC = () => {
  return (
    <StyledPageLayout>
      <LoginContainer />
      <DashboardContainer />
      {/* <IndexContainer /> */}
    </StyledPageLayout>
  );
};

const StyledPageLayout = styled.div`
  position: relative;
  min-height: 100vh;
  padding: 16px;
`;
export default index;
