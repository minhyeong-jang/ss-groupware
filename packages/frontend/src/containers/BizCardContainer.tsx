import { message, Modal } from "antd";
import { getBizCardListData } from "apis";
import { Loading } from "components/@shared";
import { BizCardTable } from "components/BizCard";
import { useBizCard } from "hooks";
import { BizCardModel, BizCardType, toBizCardUiModel } from "models";
import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";

interface Props {
  id: string;
  pw: string;
  onCheckUserInfo(): boolean;
}
export const BizCardContainer: FC<Props> = ({ onCheckUserInfo, id, pw }) => {
  const { bizCardList, loading, onTypeChange, onGetBizCardList, onNoteChange } =
    useBizCard();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (visible && !bizCardList?.length) {
      // onGetBizCardList({ id, pw });
    }
  }, [visible, id, pw, bizCardList]);

  return (
    <>
      <StyledButton onClick={() => onCheckUserInfo() && setVisible(true)}>
        [BETA] 지출결의서(법인카드)
      </StyledButton>
      <Modal
        width={1200}
        title='[BETA] 점심식대, 야근식대, 야근교통비 청구'
        visible={visible}
        okText='적용'
        cancelText='닫기'
        onOk={() => message.error("준비 중 입니다.")}
        onCancel={() => setVisible(false)}
      >
        <BizCardTable
          loading={loading}
          data={bizCardList}
          onTypeChange={onTypeChange}
          onNoteChange={onNoteChange}
        />
      </Modal>
      {loading && <Loading />}
    </>
  );
};
const StyledButton = styled.button`
  border-radius: 4px;
  width: 100%;
  border: 1px solid white;
  background: ${({ theme }) => theme.color.blue};
  color: white;
  padding: 10px;
  outline: none;
  font-size: 14px;
  border: 1px solid #;
`;
