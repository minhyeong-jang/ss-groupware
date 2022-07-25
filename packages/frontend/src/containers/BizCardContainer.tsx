import { message, Modal } from "antd";
import { Loading } from "components/@shared";
import {
  BizCardNotice,
  BizCardSearchDate,
  BizCardTable,
} from "components/BizCard";
import { useBizCard, useUserInfo } from "hooks";
import { BizCardModel, BizCardType } from "models";
import React, { FC, useEffect, useState } from "react";
import moment from "moment";

interface Props {
  onClose(): void;
}
export const BizCardContainer: FC<Props> = ({ onClose }) => {
  const { userInfo } = useUserInfo();
  const { bizCardList, isLoading, onBizcardSubmit, onGetBizCardList } =
    useBizCard();
  const [dataSource, setDataSource] = useState<BizCardModel[]>([]);
  const [selectedMonth, setSelectedMonth] = useState(moment().subtract(5, "d"));
  const [selection, setSelection] = useState<React.Key[]>([]);

  const onSearchList = () => {
    window?.gtag("event", "view_bizcard_list", {
      id: `${userInfo.profile.deptName}_${userInfo.profile.userName}`,
    });
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
      const findItem = dataSource.filter((item) => `${item.syncId}` === key)[0];
      return {
        note: findItem.note,
        syncId: `${findItem.syncId}`,
        type: findItem.type === BizCardType.DRIVE ? "DRIVE" : "FOOD",
        authSeq: findItem.authSeq,
        empSeq: findItem.empSeq,
      };
    });
    window?.gtag("event", "click_bizcard_submit", {
      id: `${userInfo.profile.deptName}_${userInfo.profile.userName}`,
    });

    const res = await onBizcardSubmit({ items });
    if (res) {
      setSelection([]);
    }
  };

  useEffect(() => {
    onSearchList();
  }, [selectedMonth]);

  useEffect(() => {
    !isLoading && setDataSource(bizCardList);
  }, [isLoading, setDataSource]);

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
          loading={isLoading}
          data={dataSource}
          selection={selection}
          onChange={setDataSource}
          onSelection={setSelection}
        />
        <BizCardNotice />
      </Modal>
      {isLoading && <Loading />}
    </>
  );
};
