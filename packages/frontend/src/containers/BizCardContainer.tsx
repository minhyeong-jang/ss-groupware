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
import moment from "moment";
import { CompanyType } from "schema";

interface Props {
  userName: string;
  onClose(): void;
}
export const BizCardContainer: FC<Props> = ({ userName, onClose }) => {
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

  const onSearchList = () => {
    window?.gtag("event", "view_bizcard_list", { id: userName });
    onGetBizCardList({
      startDate: selectedMonth.startOf("month").format("YYYYMMDD"),
      endDate: selectedMonth.endOf("month").format("YYYYMMDD"),
    });
  };
  const onSubmit = async () => {
    if (!selection.length) {
      message.error("업데이트가 필요한 내역을 선택해주세요.");
      return;
    }
    const items = selection.map((key) => {
      const findItem = bizCardList.filter(
        (item) => `${item.syncId}` === key
      )[0];
      return {
        note: findItem.note,
        syncId: `${findItem.syncId}`,
        type: findItem.type === BizCardType.DRIVE ? "DRIVE" : "FOOD",
        authSeq: findItem.authSeq,
        empSeq: findItem.empSeq,
      };
    });
    window?.gtag("event", "click_bizcard_submit", {
      id: userName,
    });

    const storage = sessionStorage.getItem("gw_musinsa_ss");
    if (storage) {
      const { id, pw, type } = JSON.parse(storage);
      const res = await onUpdateMemo({
        userInfo: {
          id: id || "",
          pw: pw || "",
          type: type || CompanyType.MUSINSA,
        },
        items,
      });

      if (res) {
        setSelection([]);
      }
    } else {
      message.error("계정 정보를 찾을 수 없습니다.");
    }
  };

  useEffect(() => {
    onSearchList();
    message.info("지출결의서 가이드라인이 추가되었습니다.", 8);
  }, []);

  return (
    <>
      <Modal
        width={1280}
        title='지출내역 작성(점심식대, 야근식대, 야근교통비)'
        visible={true}
        okText='적용'
        cancelText='닫기'
        onOk={() => onSubmit()}
        onCancel={onClose}
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
      </Modal>
      {loading && <Loading />}
    </>
  );
};
