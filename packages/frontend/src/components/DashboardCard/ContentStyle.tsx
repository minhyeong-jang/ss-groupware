import styled from "styled-components";

export const ContentLabel = styled.label`
  display: block;
  margin-bottom: 6px;
  font-size: 11px;
  color: ${({ theme }) => theme.color.gray50};
`;

export const ContentDesc = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.color.gray100};
`;

export const ContentNotice = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.color.point};
  margin-top: 16px;
`;

export const ContentBadge = styled.div``;
