import { message, Modal } from "antd";
import { Loading } from "components/@shared";
import {
  BizCardNotice,
  BizCardSearchDate,
  BizCardTable,
} from "components/BizCard";
import { useBizCard } from "hooks";
import { BizCardType } from "models";
import React, { FC, useEffect, useState } from "react";
import { CompanyType, UserInfoSchema } from "schema";
import styled from "styled-components";
import moment from "moment";

interface Props {
  userInfo: UserInfoSchema;
  onCheckUserInfo(): boolean;
}
export const BizCardContainer: FC<Props> = ({ userInfo, onCheckUserInfo }) => {
  const {
    bizCardList,
    loading,
    onTypeChange,
    onUpdateMemo,
    onGetBizCardList,
    onNoteChange,
  } = useBizCard();
  const [selectedMonth, setSelectedMonth] = useState(moment().subtract(5, "d"));
  const [selection, setSelection] = useState<React.Key[]>([]);
  const [visible, setVisible] = useState(false);

  const onSearchList = () => {
    window?.gtag("event", "view_bizcard_list", { id: userInfo.id });
    onGetBizCardList({
      userInfo,
      startDate: selectedMonth.startOf("month").format("YYYYMMDD"),
      endDate: selectedMonth.endOf("month").format("YYYYMMDD"),
    });
  };
  const onVisibleModal = () => {
    if (userInfo.type === CompanyType.MUSINSALAB) {
      message.error("무신사랩은 지원하지 않습니다.");
      return;
    }
    onCheckUserInfo() && setVisible(true);
  };
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
      authSeq: bizCardList[key as number].authSeq,
      empSeq: bizCardList[key as number].empSeq,
    }));
    window?.gtag("event", "click_bizcard_submit", {
      id: userInfo.id,
      count: items.length,
    });
    const res = await onUpdateMemo({
      userInfo: userInfo,
      items,
    });
    if (res) {
      setSelection([]);
    }
  };

  useEffect(() => {
    if (visible) {
      onSearchList();
      message.info("지출결의서 가이드라인이 추가되었습니다.", 8);
    }
  }, [visible, selectedMonth]);

  return (
    <>
      <StyledButton onClick={onVisibleModal}>
        법인카드 지출내역 작성
      </StyledButton>
      <StyledModal
        width={1280}
        title='지출내역 작성(점심식대, 야근식대, 야근교통비)'
        visible={visible}
        okText='적용'
        cancelText='닫기'
        onOk={() => onSubmit()}
        onCancel={() => setVisible(false)}
      >
        <BizCardSearchDate value={selectedMonth} onChange={setSelectedMonth} />
        <BizCardTable
          loading={loading}
          data={bizCardList}
          selection={selection}
          onSelection={setSelection}
          onTypeChange={onTypeChange}
          onNoteChange={onNoteChange}
        />
        <BizCardNotice />
      </StyledModal>
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
const StyledModal = styled(Modal)`
  .ant-modal-body {
    padding: 16px;
  }
`;
