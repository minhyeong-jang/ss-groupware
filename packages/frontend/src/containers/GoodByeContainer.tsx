import { Modal } from "antd";
import {
  BizCardNotice,
  BizCardSearchDate,
  BizCardTable,
} from "components/BizCard";
import {
  BizHistoryCard,
  MonthlyWorkCard,
  TodayWorkCard,
  VacationCard,
} from "components/DashboardCard";
import { WorkNoticeCard } from "components/DashboardCard/WorkNoticeCard";
import { DashboardHeader } from "components/DashboardHeader";
import { initBizCardModel, initUserInfoModel, toBizCardUiModel } from "models";
import moment from "moment";
import { FC, useState } from "react";
import styled from "styled-components";

export const GoodByeContainer: FC = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <StyledPopup>
        <StyledPopupBody>
          <StyledTitle>
            <StyledIcon>
              <span onClick={() => {}}>👋</span>
            </StyledIcon>
            서비스가 종료되었습니다.
          </StyledTitle>
          <StyledDesc>지금까지 이용해 주셔서 감사합니다.</StyledDesc>
        </StyledPopupBody>
        <StyledButton onClick={() => {}} />
      </StyledPopup>
      <StyledContainer>
        <DashboardHeader
          workToday={initUserInfoModel.workToday}
          profile={initUserInfoModel.profile}
          onCheck={() => {}}
          onLogout={() => {}}
        />
        <StyledCardWrap>
          <TodayWorkCard workToday={initUserInfoModel.workToday} />
          <VacationCard restDay={initUserInfoModel.restDay || 0} />
          <BizHistoryCard
            onVisibleModal={() => setVisible(true)}
            totalPrice={initUserInfoModel.bizCardTotalPrice}
          />
          <MonthlyWorkCard monthlyWork={initUserInfoModel.monthlyWork} />
          <WorkNoticeCard notices={initUserInfoModel.notices} />
        </StyledCardWrap>
        <StyledDeveloper>Made by Styleshare.react</StyledDeveloper>
        {visible && (
          <Modal
            width={1280}
            title='지출내역 작성(점심식대, 야근식대, 야근교통비)'
            visible={true}
            okText='적용'
            cancelText='닫기'
            onOk={() => () => setVisible(false)}
            onCancel={() => () => setVisible(false)}
          >
            <BizCardSearchDate value={moment()} onChange={() => {}} />
            <BizCardTable
              loading={false}
              data={toBizCardUiModel(initBizCardModel)}
              selection={[]}
              onChange={() => {}}
              onSelection={() => {}}
            />
            <BizCardNotice />
          </Modal>
        )}
      </StyledContainer>
    </>
  );
};
const StyledPopup = styled.div`
  display: none;
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

const StyledContainer = styled.div`
  padding: 0;
  max-width: 720px;
  margin: 0 auto;
`;
const StyledDeveloper = styled.div`
  text-align: center;
  margin-top: 16px;
  font-size: 13px;
  color: #0d1652;
`;
const StyledCardWrap = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(1, 1fr);

  ${({ theme }) => theme.mediaQuery.md} {
    grid-template-columns: repeat(2, 1fr);
  }
`;
const StyledButton = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100px;
  height: 100px;
`;
