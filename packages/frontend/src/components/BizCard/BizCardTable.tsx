import { Input, Select, Table } from "antd";
import { SelectTag, tagColors } from "components/@shared";
import React, { FC } from "react";
import styled from "styled-components";
import { BizCardModel, BizCardType } from "models";
import { format } from "date-fns";

interface Props {
  data: BizCardModel[];
  loading: boolean;
  onSelection(key: React.Key[]): void;
  onTypeChange(type: BizCardType, index: number): void;
  onNoteChange(note: string, index: number): void;
}
export const BizCardTable: FC<Props> = ({
  data,
  loading,
  onSelection,
  onTypeChange,
  onNoteChange,
}) => {
  const columns = [
    {
      align: "center" as const,
      dataIndex: "name",
      key: "name",
      title: "사용처",
      width: 200,
    },
    {
      align: "center" as const,
      dataIndex: "time",
      key: "time",
      title: "결제일",
      render: (time: Date) => format(time, "yyyy/MM/dd HH:mm:ss"),
      width: 150,
    },
    {
      align: "center" as const,
      dataIndex: "requestAmount",
      key: "requestAmount",
      title: "지출금액",
      width: 100,
      render: (requestAmount: number) => `${requestAmount.toLocaleString()}원`,
    },
    {
      align: "center" as const,
      dataIndex: "type",
      key: "type",
      render: (type: string, _: unknown, index: number) => (
        <StyledSelect
          options={[
            {
              label: BizCardType.LUNCH,
              value: "점심식대",
            },
            {
              label: BizCardType.DINNER,
              value: "야근식대",
            },
            {
              label: BizCardType.DRIVE,
              value: "야근교통비",
            },
          ]}
          placeholder='지출타입'
          value={type}
          onChange={(type) => onTypeChange(type as BizCardType, index)}
        />
      ),
      sorter: true,
      title: "결제타입",
      width: 150,
    },
    {
      align: "center" as const,
      dataIndex: "input",
      key: "input",
      render: (_: unknown, record: BizCardModel, index: number) => {
        switch (record.type) {
          case "야근교통비":
            return (
              <>
                <StyledInput
                  placeholder='출발지(선릉)'
                  value={record.note.match(/\(([ㄱ-ㅎㅏ-ㅣ가-힣0-9]*)\s→/)?.[1]}
                  onChange={(e) =>
                    onNoteChange(
                      `야근교통비 (${e.target.value.replace(/[\(\)]/g, "")} → ${
                        record.note.match(
                          /→\s([ㄱ-ㅎㅏ-ㅣ가-힣0-9]*)\)/
                        )?.[1] || ""
                      })
                      (${format(record.time, "yyyy.MM.dd HH:ii")})`,
                      index
                    )
                  }
                />
                →
                <StyledInput
                  placeholder='도착지'
                  value={record.note.match(/→\s([ㄱ-ㅎㅏ-ㅣ가-힣0-9]*)\)/)?.[1]}
                  onChange={(e) =>
                    onNoteChange(
                      `야근교통비 (${
                        record.note.match(
                          /\(([ㄱ-ㅎㅏ-ㅣ가-힣0-9]*)\s→/
                        )?.[1] || ""
                      } → ${e.target.value.replace(/[\(\)]/g, "")})
                      (${format(record.time, "yyyy.MM.dd HH:ii")})`,
                      index
                    )
                  }
                />
              </>
            );
          case "점심식대":
            return (
              <>
                <StyledInput
                  placeholder='본인명'
                  value={record.note.match(/^([^\s]*)\s?/)?.[1] || ""}
                  onChange={(e) => {
                    const addCount = record.note.match(/외\s(0-9*)\)/)?.[1];
                    onNoteChange(
                      `${e.target.value} ${
                        !!addCount && addCount !== "0" ? `외 ${addCount}인` : ""
                      }`,
                      index
                    );
                  }}
                />
                외
                <StyledInput
                  placeholder='인원 수'
                  value={record.note.replace(/[^\d]/g, "") || "0"}
                  onChange={(e) => {
                    const addCount = parseInt(
                      e.target.value.replace(/[^\d]/g, "") || "0"
                    );
                    onNoteChange(
                      `${record.note.match(/^([^\s]*)\s?/)?.[1] || ""} ${
                        addCount > 0 ? `외 ${addCount}인` : ""
                      }`,
                      index
                    );
                  }}
                />
                인
              </>
            );
          case "야근식대":
            const userStr = record.note
              .replace(/\s/g, "")
              .match(/(.*)야근|점심/)?.[1];
            const userList = userStr ? userStr.split(",") : [];

            return (
              <>
                <StyledSelect
                  mode='tags'
                  placeholder='참여자 이름(본인 포함)'
                  tagRender={(customTag) =>
                    SelectTag({
                      ...customTag,
                      tagColor: tagColors[userList.indexOf(customTag.value)],
                    })
                  }
                  value={userList}
                  onChange={(selectList) =>
                    onNoteChange(
                      `${(selectList as string[]).join(
                        ", "
                      )} 야근식대 (${format(record.time, "yyyy.MM.dd")})`,
                      index
                    )
                  }
                />
              </>
            );
        }
      },
      title: "참여자",
      width: 300,
    },
    {
      title: "적요",
      align: "center" as const,
      dataIndex: "note",
      key: "note",
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      onSelection(selectedRowKeys);
    },
  };

  return (
    <StyledContainer>
      <Table
        size='small'
        scroll={{ x: "max-content" }}
        columns={columns}
        dataSource={data}
        pagination={false}
        loading={loading}
        rowSelection={{
          // type: selectionType,
          ...rowSelection,
        }}
        rowKey={(_, index) => `${index}`}
      />
    </StyledContainer>
  );
};
const StyledContainer = styled.div`
  table {
    table-layout: fixed;
  }
  .ant-table {
    border: 1px solid #dedede;
    border-radius: 4px;
    overflow: hidden;
    font-size: 12px;
  }
  .ant-table-footer {
    padding: 0;
  }
  .ant-select-selection-overflow-item {
    margin: 3px 0;
  }
`;
const StyledSelect = styled(Select)`
  font-size: 12px;
  width: 100%;
`;
const StyledInput = styled(Input)`
  width: 100px;
  margin: 0 5px;
  font-size: 12px;
`;
