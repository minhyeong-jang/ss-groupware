import { Input, Select, Table } from "antd";
import { SelectTag, tagColors } from "components/@shared";
import React, { FC, useMemo, useState } from "react";
import styled from "styled-components";
import { BizCardModel, BizCardType } from "models";
import { format } from "date-fns";

interface Props {
  data: BizCardModel[];
  loading: boolean;
  selection: React.Key[];
  onChange(items: BizCardModel[]): void;
  onSelection(key: React.Key[]): void;
}
export const BizCardTable: FC<Props> = ({
  data,
  loading,
  selection,
  onSelection,
  onChange,
}) => {
  const onTypeChange = (type: BizCardType, index: number) => {
    const items = [...(data || [])];
    items[index].type = type;
    items[index].note = "";
    onChange(items);
  };

  const onNoteChange = (note: string, index: number) => {
    const items = [...(data || [])];
    items[index].note = note;
    onChange(items);
  };

  const totalPrice = useMemo(() => {
    return data.reduce((curr, next) => curr + next.requestAmount, 0);
  }, [data]);
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
      render: (time: Date) => format(time, "yy/MM/dd HH:mm"),
      width: 110,
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
      width: 100,
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
                      }) (${format(record.time, "yyyy.MM.dd HH:mm")})`,
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
                      } → ${e.target.value.replace(/[\(\)]/g, "")}) (${format(
                        record.time,
                        "yyyy.MM.dd HH:mm"
                      )})`,
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
                    const addCount = record.note.replace(/[^\d]/g, "");
                    onNoteChange(
                      `${e.target.value}${
                        !!addCount && addCount !== "0"
                          ? ` 외 ${addCount}인`
                          : `${
                              !!addCount && addCount !== "0"
                                ? ` 외 ${addCount}인`
                                : ""
                            }`
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
      width: 290,
    },
    {
      title: "적요",
      align: "center" as const,
      dataIndex: "note",
      key: "note",
      width: 300,
    },
  ];

  const rowSelection = {
    selectedRowKeys: selection,
    onChange: (selectedRowKeys: React.Key[]) => {
      onSelection(selectedRowKeys);
    },
  };

  return (
    <StyledContainer>
      <Table
        size='small'
        scroll={{ x: "1200px", y: "400px" }}
        columns={columns}
        dataSource={data}
        pagination={false}
        loading={loading}
        rowSelection={{
          ...rowSelection,
        }}
        rowKey={(record) => `${record.syncId}`}
      />
      <StyledFooter>
        총 결제 금액 : <b>{(totalPrice || 0).toLocaleString()}</b>원
      </StyledFooter>
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
const StyledFooter = styled.div`
  margin-top: 15px;
  text-align: right;
`;
