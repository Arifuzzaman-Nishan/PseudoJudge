import React, { useState } from "react";
import { Radio, Space, Table, Tag } from "antd";

const AntdTable: React.FC<{
  dataSource: any[];
  paginationData: any;
  columns: any;
}> = ({ dataSource, paginationData, columns }) => {
  const {
    totalPages,
    hasNextPage,
    hasPreviousPage,
    pageIndex,
    pageSize,
    total,
    setPagination,
  } = paginationData;

  return <div></div>;
};

export default AntdTable;
