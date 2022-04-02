import { Popover } from "antd";
import React, { FC } from "react";
import styled, { css } from "styled-components";
import { QuestionCircleOutlined } from "@ant-design/icons";

const ManagerPopover: FC = () => (
  <StyledList $isPrefix>
    <StyledInfo>본인이 속한 부서의 담당자를 합의자로 등록해주세요.</StyledInfo>
    <li>
      프로덕트본부: <b>심미연</b>
    </li>
    <li>
      마케팅실: <b>이수빈</b>
    </li>
    <li>
      운영기획팀: <b>김다운</b>
    </li>
    <li>
      영업팀, 비즈니스팀: <b>이형표</b>
    </li>
    <li>
      고객경험팀: <b>황연진</b>
    </li>
  </StyledList>
);
export const BizCardNotice: FC = () => {
  return (
    <StyledContainer>
      <StyledTitle>유의사항</StyledTitle>
      <StyledList $isPrefix>
        <li>
          점심식대는 <b>본인 외 인원 수</b>를 입력해야합니다. ( 혼자 식사한 경우
          0을 입력해주세요. )
        </li>
        <li>
          야근식대는 <b>함께 식사한 모든 사람의 이름</b>을 입력해야합니다.
        </li>
        <li>
          야근교통비는 <b>출발지, 도착지</b>를 입력해야합니다.
        </li>
      </StyledList>
      <StyledTitle>
        <StyledRed>(New)</StyledRed> 지출결의서 가이드라인
      </StyledTitle>
      <StyledList>
        <li>
          1. 그룹웨어 전자결재 <b>{">"}</b> 지출결의서(법인카드) 클릭
        </li>
        <li>
          2. 카드사용내역 클릭 <b>{">"}</b> N월1일~말일 검색 <b>{">"}</b>{" "}
          항목개수 전체로 변경 <b>{">"}</b> 사용내역 선택 후 하단 반영 클릭
        </li>
        <li>
          3. 항목 선택 후, 회계일자는 당월 말일, 지급요청일은 익월 15일 선택{" "}
          <b>{">"}</b>우측 상단 결재상신 클릭 ( ex) 3월 내역 : 회계일자
          2022-03-31, 지급요청일 2022-04-15 )
        </li>
        <li>
          4. 결재자 : 본인, 팀장&nbsp;<b>{" / "}</b>&nbsp;합의자 :{" "}
          <Popover content={ManagerPopover}>
            <b>
              <u>
                담당부서 합의자 ( 마우스 올려보세요. )
                <QuestionCircleOutlined />
              </u>
            </b>
          </Popover>
          &nbsp;<b>{" / "}</b>&nbsp;수신참조 : 무신사-재무관리실
        </li>
        <li>
          5. 제목 : <b>2022년 N월 법인카드 사용_홍길동 (일반경비)</b>
        </li>
        <li>6. 본문에 동의합니다 클릭 후 결재상신</li>
      </StyledList>
    </StyledContainer>
  );
};
const StyledContainer = styled.div``;
const StyledTitle = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin: 30px 0 15px;
`;
const StyledList = styled.ul<{ $isPrefix?: boolean }>`
  color: #999;
  font-size: 14px;

  u {
    cursor: pointer;
  }
  svg {
    vertical-align: middle;
    margin: -5px 0 0 3px;
    font-weight: bold;
  }
  li {
    position: relative;
    margin-bottom: 8px;
    padding-left: 9px;
    color: rgb(117, 125, 134);
    font-size: 0.8125rem;
    line-height: 18px;
    word-break: keep-all;

    ${({ $isPrefix }) =>
      $isPrefix
        ? css`
            &::before {
              position: absolute;
              left: 0px;
              font-weight: bold;
              content: "·";
            }
          `
        : css`
            padding-left: 0;
          `}
  }
`;
const StyledRed = styled.span`
  color: red;
`;
const StyledInfo = styled.div`
  color: #1197f0;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 14px;
`;
