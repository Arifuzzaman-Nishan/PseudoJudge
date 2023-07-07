"use client";
import { PaginationState } from "@tanstack/react-table";
import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import {
  OptionType,
  SingleValueType,
} from "../Shared/CustomSelect/CustomSelect";
import { useGetProblemsQuery } from "@/features/problem/problemApi";
import AntdTable from "../AntdTable";
import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

const judgeOptions: OptionType[] = [
  {
    value: "LOJ",
    label: "LIGHTOJ",
  },
  {
    value: "UVA",
    label: "UVA",
  },
];

interface DataType {
  index: number;
  title: string;
  ojName: string;
  difficultyRating: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "S.No",
    dataIndex: "index",
    key: "index",
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "OjName",
    dataIndex: "ojName",
    key: "ojName",
    render: (ojName: string) => (
      <span>
        <Tag color="green">{ojName}</Tag>
      </span>
    ),
  },
  {
    title: "Difficulty Rating",
    dataIndex: "difficultyRating",
    key: "difficultyRating",
    render: (difficultyRating: string) => (
      <span>
        <Tag color="green">{difficultyRating}</Tag>
      </span>
    ),
  },
];

type TablePaginationPosition =
  | "topLeft"
  | "topCenter"
  | "topRight"
  | "bottomLeft"
  | "bottomCenter"
  | "bottomRight";

const ProblemsFC: FC = () => {
  const router = useRouter();

  const [bottom, setBottom] = useState<TablePaginationPosition>("bottomLeft");

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 1,
    pageSize: 2,
  });

  const [query, setQuery] = useState<string>("");

  const {
    isLoading,
    isError,
    data: problemsData,
    isSuccess,
  } = useGetProblemsQuery({
    query,
    page: pageIndex,
    limit: pageSize,
  });

  if (isLoading) {
    console.log("loading...");
  }

  if (isSuccess) {
    // console.log("success data is ", problemsData);
  }

  const handleRowClick = (row: any) => {
    console.log("clicked row is ", row);
    router.push(`/problem/${row.key}`);
  };

  const dataSources: DataType[] = problemsData?.problems?.map(
    (problemData: any, index: number) => {
      const { _id, title, ojName, difficultyRating } = problemData;
      return {
        key: _id,
        index: index + 1,
        title,
        ojName,
        difficultyRating,
      };
    }
  );

  return (
    <div className="p-9">
      <Table
        onRow={(record, rowIndex) => {
          return {
            onClick: () => handleRowClick(record), // click row
            className: "cursor-pointer",
          };
        }}
        columns={columns}
        pagination={{
          position: [bottom],
          total: problemsData.pagination.total,
          pageSize: pageSize,
          current: pageIndex,
          responsive: true,
          onChange(page, pageSize) {
            console.log("page is ", page);
            console.log("pageSize is ", pageSize);
            setPagination({ pageIndex: page, pageSize });
          },
        }}
        dataSource={dataSources}
      />
    </div>
  );
};

export default ProblemsFC;
