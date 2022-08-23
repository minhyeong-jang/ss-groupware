import { FC } from "react";
import styled from "styled-components";

export const GoodByeContainer: FC = () => {
  return (
    <StyledPopup>
      <StyledPopupBody>
        <StyledTitle>
          <StyledIcon>👋</StyledIcon> 서비스가 종료되었습니다.
        </StyledTitle>
        <StyledDesc>지금까지 이용해 주셔서 감사합니다.</StyledDesc>
      </StyledPopupBody>
    </StyledPopup>
  );
};
const StyledPopup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  padding: 16px;

  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    backdrop-filter: blur(8px);
    background-color: rgba(0, 0, 0, 0.3);
  }
`;
const StyledPopupBody = styled.div`
  position: absolute;
  max-width: 520px;
  width: calc(100% - 32px);
  border: 1px solid #dedede;
  background-color: white;
  padding: 32px;
  left: 50%;
  right: initial;
  top: 50%;
  bottom: initial;
  border-radius: 8px;
  transform: translate(-50%, -50%);
`;
const StyledTitle = styled.div`
  text-align: center;
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: bold;
`;
const StyledIcon = styled.div`
  font-size: 35px;
  margin-bottom: 8px;
`;
const StyledDesc = styled.div`
  font-size: 13px;
  text-align: center;
`;
