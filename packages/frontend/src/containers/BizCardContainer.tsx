import { Modal } from "antd";
import { getBizCardListData } from "apis";
import { Loading } from "components/@shared";
import { BizCardTable } from "components/BizCard";
import { useBizCard } from "hooks";
import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";

interface Props {
  id: string;
  pw: string;
  onCheckUserInfo(): boolean;
}
export const BizCardContainer: FC<Props> = ({ onCheckUserInfo, id, pw }) => {
  const { bizCardList, userName, loading, onGetBizCardList } = useBizCard();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible && !bizCardList?.length) {
      onGetBizCardList({ id, pw });
    }
  }, [visible, id, pw, bizCardList]);

  return (
    <>
      <StyledButton onClick={() => onCheckUserInfo() && setVisible(true)}>
        지출결의서(법인카드) - 준비중
      </StyledButton>
      <Modal
        width={1200}
        title='점심식대, 야근식대, 야근교통비 청구 ( 준비중 )'
        visible={visible}
        onOk={() => console.log("submit")}
        onCancel={() => setVisible(false)}
      >
        <BizCardTable
          loading={loading}
          userName={userName}
          data={bizCardList}
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
