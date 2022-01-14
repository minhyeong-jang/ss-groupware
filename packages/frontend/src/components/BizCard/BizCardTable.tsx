import { Input, Select, Table } from "antd";
import { SelectTag, tagColors } from "components/@shared";
import React, { FC } from "react";
import styled from "styled-components";
import { BizCardModel } from "models";

interface Props {
  data: BizCardModel[];
  loading: boolean;
  userName: string;
}
export const BizCardTable: FC<Props> = ({ data, userName, loading }) => {
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
      render: (type: string) => (
        <StyledSelect
          options={[
            {
              label: "점심식대",
              value: "점심식대",
            },
            {
              label: "야근식대",
              value: "야근식대",
            },
            {
              label: "야근교통비",
              value: "야근교통비",
            },
          ]}
          placeholder='지출타입'
          value={type}
          // onChange={changeSelect}
        />
      ),
      sorter: true,
      title: "결제타입",
      width: 150,
    },
    {
      align: "center" as const,
      dataIndex: "note",
      key: "note",
      render: (note: string, record: BizCardModel) => {
        switch (record.type) {
          case "야근교통비":
            return (
              <>
                <StyledInput placeholder='출발지(선릉)' />→
                <StyledInput placeholder='도착지' />
              </>
            );
          case "점심식대":
            return (
              <>
                {userName} 외<StyledInput placeholder='인원 수' />인
              </>
            );
          case "야근식대":
            return (
              <StyledSelect
                mode='tags'
                placeholder='참여자 이름(본인 포함)'
                tagRender={(customTag) =>
                  SelectTag({
                    ...customTag,
                    tagColor:
                      tagColors[Math.floor(Math.random() * tagColors.length)],
                  })
                }
                value={
                  note
                    .match(/(.*) 야근|점심/)?.[1]
                    ?.replace(/\s/g, "")
                    ?.split(",") || []
                }
                // onChange={changeSelect}
              />
            );
        }
      },
      title: "참여자",
      width: 300,
    },
  ];

  return (
    <StyledContainer>
      <Table
        size='small'
        scroll={{ x: "max-content" }}
        columns={columns}
        dataSource={data}
        pagination={false}
        loading={loading}
        rowKey={(record) => record.time}
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
