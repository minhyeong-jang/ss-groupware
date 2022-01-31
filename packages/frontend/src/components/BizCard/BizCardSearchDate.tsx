import { DatePicker } from "antd";
import { Moment } from "moment";
import React, { FC } from "react";
import styled from "styled-components";

interface Props {
  value: Moment;
  onChange(value: Moment): void;
}
export const BizCardSearchDate: FC<Props> = ({ value, onChange }) => {
  const onDateChange = (value: Moment | null) => {
    if (!value) {
      return;
    }
    onChange(value);
  };
  return (
    <StyledContainer>
      정산 월
      <StyledDatePicker value={value} onChange={onDateChange} picker='month' />
    </StyledContainer>
  );
};
const StyledContainer = styled.div`
  margin-bottom: 32px;
  border: 1px solid #dedede;
  padding: 12px 24px;
  font-size: 14px;
  border-radius: 4px;
`;
const StyledDatePicker = styled(DatePicker)`
  margin-left: 25px;
`;
