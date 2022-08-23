import {
  DashboardContainer,
  GoodByeContainer,
  LoginContainer,
} from "containers";
import { FC, useEffect } from "react";
import styled from "styled-components";

const index: FC = () => {
  useEffect(() => {
    localStorage.removeItem("gw_musinsa_ss");
  }, []);

  return (
    <StyledPageLayout>
      {/* <LoginContainer /> */}
      <DashboardContainer />
      <GoodByeContainer />
    </StyledPageLayout>
  );
};

const StyledPageLayout = styled.div`
  position: relative;
  min-height: 100vh;
  padding: 16px;
`;
export default index;
