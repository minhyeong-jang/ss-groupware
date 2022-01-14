import { Tag as AntdTag } from "antd";
import { CustomTagProps } from "rc-select/lib/interface/generator";
import React from "react";
import styled from "styled-components";

export const tagColors = [
  "pink",
  "red",
  "orange",
  "cyan",
  "green",
  "blue",
  "purple",
  "geekblue",
  "magenta",
  "volcano",
  "gold",
  "success",
  "processing",
  "error",
  "default",
  "warning",
];

interface Props extends CustomTagProps {
  tagColor: string | null;
}
export const SelectTag = ({ tagColor, value, closable, onClose }: Props) => {
  if (!tagColor) {
    return <></>;
  }
  return (
    <StyledAntdTag closable={closable} color={tagColor} onClose={onClose}>
      {value}
    </StyledAntdTag>
  );
};

const StyledAntdTag = styled(AntdTag)`
  .ant-tag-close-icon {
    vertical-align: middle;
    margin-top: -2px;
  }
`;
