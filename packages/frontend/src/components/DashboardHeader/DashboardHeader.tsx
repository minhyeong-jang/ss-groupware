import { FC } from "react";
import styled from "styled-components";
import moment from "moment";
import { UserInfoProfileModel, UserInfoWorkTodayModel } from "models";
import { Button } from "antd";

interface Props {
  profile: UserInfoProfileModel;
  workToday: UserInfoWorkTodayModel;
  onCheck(type: string): void;
}
export const DashboardHeader: FC<Props> = ({ profile, workToday, onCheck }) => {
  return (
    <StyledContainer>
      <StyledDate>{moment().format("M월 D일 dddd")}</StyledDate>
      <StyledName>
        <b>
          {profile.deptName} - {profile.userName}
        </b>
        님, 안녕하세요 :)
      </StyledName>
      {!workToday.comeAt && (
        <StyledWorkWrap>
          <StyledNotice>🧑‍💻 오늘 하루 업무를 시작해볼까요?</StyledNotice>
          <StyledButton type='primary' onClick={() => onCheck("in")}>
            출근하기
          </StyledButton>
        </StyledWorkWrap>
      )}
      {workToday.comeAt && !workToday.leaveAt && (
        <StyledWorkWrap>
          <StyledNotice>🏠 오늘 하루도 고생했어요!</StyledNotice>
          <StyledButton type='primary' onClick={() => onCheck("out")}>
            퇴근하기
          </StyledButton>
        </StyledWorkWrap>
      )}
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
  font-size: 12px;
  color: ${({ theme }) => theme.color.gray60};
`;
const StyledName = styled.div`
  font-size: 14px;
  margin-top: 8px;
`;
const StyledWorkWrap = styled.div`
  margin-top: 24px;
`;
const StyledNotice = styled.div`
  font-size: 14px;
`;
const StyledButton = styled(Button)`
  margin-top: 12px;
  width: 100%;
`;
