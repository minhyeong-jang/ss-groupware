import { FC } from "react";
import styled from "styled-components";

export const UserInfo: FC = () => {
  return <StyledContainer>OOO님 안녕하세요.</StyledContainer>;
};

const StyledContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
`;
