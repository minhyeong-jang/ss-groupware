import { Select, Input } from "antd";
import React, { FC } from "react";
import styled from "styled-components";
import { CompanyType, UserInfoSchema } from "schema/userinfo.schema";

interface Props {
  userInfo: UserInfoSchema;
  onChange(type: string, value: string): void;
}
export const UserForm: FC<Props> = ({ userInfo, onChange }) => {
  return (
    <StyledContainer>
      <StyledInputWrap>
        <StyledLabel>회사명</StyledLabel>
        <StyledSelect
          size='large'
          options={[
            {
              label: "무신사",
              value: CompanyType.MUSINSA,
            },
            {
              label: "무신사랩",
              value: CompanyType.MUSINSALAB,
            },
          ]}
          placeholder='회사'
          value={userInfo.type}
          onChange={(type) => onChange("type", type as CompanyType)}
        />
      </StyledInputWrap>
      <StyledInputWrap>
        <StyledLabel>아이디</StyledLabel>
        <StyledInput
          value={userInfo.id}
          onChange={(e) => onChange("id", e.target.value)}
        />
      </StyledInputWrap>
      <StyledInputWrap>
        <StyledLabel>비밀번호</StyledLabel>
        <StyledInput
          type='password'
          value={userInfo.pw}
          onChange={(e) => onChange("pw", e.target.value)}
        />
      </StyledInputWrap>
    </StyledContainer>
  );
};
const StyledContainer = styled.div`
  color: ${({ theme }) => theme.color.gray100};
`;
const StyledInputWrap = styled.div`
  margin: 0 0 15px;
  font-size: 13px;
`;
const StyledSelect = styled(Select)`
  font-size: 13px;
  width: 100%;
`;
const StyledLabel = styled.div`
  margin-bottom: 8px;
  font-weight: bold;
`;
const StyledInput = styled(Input)`
  outline: none;
  padding: 8px 11px;
`;
