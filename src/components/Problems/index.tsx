"use client";
import {
  problemApi,
  useGetProblemsQuery,
} from "@/redux/features/problem/problemApi";
import {
  ColumnDef,
  PaginationState,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FC, useEffect, useMemo, useState } from "react";
import Table from "../Shared/Table";
import Pagination from "../Shared/Pagination";
import { useRouter } from "next/navigation";
import CustomSelect, {
  OptionType,
  SingleValueType,
} from "../Shared/CustomSelect/CustomSelect";
import Search from "../Shared/Search";
import useDebounce from "@/hooks/useDebounce";
import { useAppDispatch } from "@/redux/hooks";

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
    pageSize: 1,
  });

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const defaultData = useMemo(() => [], []);
  const [query, setQuery] = useState<string>("");

  const {
    data: problemsData,
    isLoading,
    isError,
    isSuccess,
  } = useGetProblemsQuery({ pageIndex, pageSize, query });

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

  const judgeSelect = (selectedOption: SingleValueType) => {
    console.log(selectedOption);
  };

  const dispatch = useAppDispatch();

  const handleSearch = useDebounce((query) => {
    setQuery(query);
  }, 500);

  // useEffect(() => {
  //   if (!!query) {
  //     dispatch(
  //       problemApi.endpoints.getProblems.initiate(
  //         {
  //           pageIndex,
  //           pageSize,
  //           query,
  //         },
  //         {
  //           forceRefetch: true,
  //         }
  //       )
  //     );
  //   } else {
  //     setQuery("");
  //   }
  // }, [dispatch, pageIndex, pageSize, query]);

  return (
    <div>
      <Table
        headers={table.getHeaderGroups()}
        rows={table.getRowModel().rows}
        data={problemsData?.problems}
        content={content}
        handleRowClick={handleRowClick}
        PaginationCP={
          <Pagination
            current={pageIndex + 1}
            table={table}
            total={problemsData?.totalPages}
            hasNextPage={problemsData?.hasNextPage}
            hasPreviousPage={problemsData?.hasPreviousPage}
          />
        }
        filterCP={
          <CustomSelect
            instanceId="judge-select"
            options={judgeOptions}
            callback={judgeSelect}
          />
        }
        SearchCP={<Search handleSearch={handleSearch} />}
      />
    </div>
  );
};

export default ProblemsFC;
