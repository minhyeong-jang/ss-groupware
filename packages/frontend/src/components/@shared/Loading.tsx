import { Spin } from "antd";
import React, { FC } from "react";
import styled from "styled-components";

export const Loading: FC = () => {
  return (
    <StyledLoadingWrap>
      <Spin />
    </StyledLoadingWrap>
  );
};
const StyledLoadingWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  backdrop-filter: blur(5px);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;
