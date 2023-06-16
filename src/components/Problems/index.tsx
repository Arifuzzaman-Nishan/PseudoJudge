import { useGetProblemsQuery } from "@/redux/features/problem/problemApi";
import {
  ColumnDef,
  PaginationState,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FC, useMemo, useState } from "react";
import Table from "../Shared/Table";
import Pagination from "../Shared/Pagination";
import { useRouter } from "next/navigation";

const ProblemsFC: FC = () => {
  const router = useRouter();

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: "Title",
        accessorKey: "title",
        cell: (info) => info.getValue(),
      },
      {
        header: "OJ Name",
        accessorKey: "ojName",
        cell: (info) => info.getValue(),
      },
      {
        header: "Difficulty Rating",
        accessorKey: "difficultyRating",
        cell: (info) => info.getValue(),
      },
    ],
    []
  );

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 6,
  });

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const defaultData = useMemo(() => [], []);

  const {
    data: problemsData,
    isLoading,
    isError,
    isSuccess,
  } = useGetProblemsQuery({ pageIndex, pageSize });

  const table = useReactTable({
    data: problemsData?.problems ?? defaultData,
    columns,
    pageCount: problemsData?.totalPages ?? -1,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    // debugTable: true,
  });

  let content: React.JSX.Element = <></>;

  if (isLoading) {
    console.log("loading...");
    content = <div>Loading...</div>;
  }
  if (!isLoading && isError) {
    console.log("error");
    content = <div>Error!</div>;
  }
  if (!isError && !isLoading && problemsData?.problems?.length === 0) {
    console.log("no problems found");
    content = <div>No problems found</div>;
  }

  const handleRowClick = (row: any) => {
    console.log("clicked row is ", row);
    router.push(`/problem?ojName=${row.ojName}&problemId=${row.ojProblemId}`);
  };

  return (
    <div>
      <Table
        headers={table.getHeaderGroups()}
        rows={table.getRowModel().rows}
        data={problemsData?.problems}
        content={content}
        handleRowClick={handleRowClick}
      />

      <Pagination
        current={pageIndex + 1}
        table={table}
        total={problemsData?.totalPages}
        hasNextPage={problemsData?.hasNextPage}
        hasPreviousPage={problemsData?.hasPreviousPage}
      />
    </div>
  );
};

export default ProblemsFC;
