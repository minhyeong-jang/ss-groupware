import { DashboardContainer, IndexContainer, LoginContainer } from "containers";
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
  background-image: linear-gradient(137deg, #0d5afd85 0%, #ff730000 40%),
    linear-gradient(225deg, #0dfd9c85 0%, #69a1ec00 40%),
    linear-gradient(45deg, #0be3c985 0%, #ff64ff00 40%),
    linear-gradient(270deg, #00d3fa, #0be3c9);
`;
export default index;
