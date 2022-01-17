import { message, Modal } from "antd";
import { Loading } from "components/@shared";
import { BizCardNotice, BizCardTable } from "components/BizCard";
import { useBizCard } from "hooks";
import { BizCardType } from "models";
import React, { FC, useEffect, useState } from "react";
import { UserInfoSchema } from "schema";
import styled from "styled-components";

interface Props {
  userInfo: UserInfoSchema;
  onCheckUserInfo(): boolean;
}
export const BizCardContainer: FC<Props> = ({ userInfo, onCheckUserInfo }) => {
  const {
    bizCardList,
    status,
    loading,
    onTypeChange,
    onUpdateMemo,
    onGetBizCardList,
    onNoteChange,
  } = useBizCard();
  const [selection, setSelection] = useState<React.Key[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible && status === "idle") {
      onGetBizCardList(userInfo);
    }
  }, [visible, userInfo, bizCardList]);

  const onSubmit = async () => {
    if (!selection.length) {
      message.error("업데이트가 필요한 내역을 선택해주세요.");
      return;
    }
    const items = selection.map((key) => ({
      note: bizCardList[key as number].note,
      syncId: `${bizCardList[key as number].syncId}`,
      type:
        bizCardList[key as number].type === BizCardType.DRIVE
          ? "DRIVE"
          : "FOOD",
    }));
    await onUpdateMemo({ userInfo: userInfo, items });
    setSelection([]);
  };
  return (
    <>
      <StyledButton onClick={() => onCheckUserInfo() && setVisible(true)}>
        [BETA] 지출결의서(법인카드)
      </StyledButton>
      <Modal
        width={1280}
        title='[BETA] 점심식대, 야근식대, 야근교통비 청구'
        visible={visible}
        okText='적용'
        cancelText='닫기'
        onOk={() => onSubmit()}
        onCancel={() => setVisible(false)}
      >
        <BizCardTable
          loading={loading}
          data={bizCardList}
          onSelection={setSelection}
          onTypeChange={onTypeChange}
          onNoteChange={onNoteChange}
        />
        <BizCardNotice />
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
`;
