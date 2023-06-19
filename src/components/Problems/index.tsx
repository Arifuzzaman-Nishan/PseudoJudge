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

      <NewTable />
    </div>
  );
};

export default ProblemsFC;

const NewTable = () => {
  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="border rounded-lg divide-y divide-gray-200">
            <div className="py-3 px-4">
              <div className="relative max-w-xs">
                <label
                  htmlFor="hs-table-with-pagination-search"
                  className="sr-only"
                >
                  Search
                </label>
                <input
                  type="text"
                  name="hs-table-with-pagination-search"
                  id="hs-table-with-pagination-search"
                  className="p-3 pl-10 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 "
                  placeholder="Search for items"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-4">
                  <svg
                    className="h-3.5 w-3.5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 ">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      Age
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      Address
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
                      John Brown
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      45
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      New York No. 1 Lake Park
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a className="text-blue-500 hover:text-blue-700" href="#">
                        Delete
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* pagination */}
            <div className="py-1 px-4">
              <nav className="flex items-center space-x-2">
                <a
                  className="text-gray-400 hover:text-blue-600 p-4 inline-flex items-center gap-2 font-medium rounded-md"
                  href="#"
                >
                  <span aria-hidden="true">«</span>
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="w-10 h-10 bg-blue-500 text-white p-4 inline-flex items-center text-sm font-medium rounded-full"
                  href="#"
                  aria-current="page"
                >
                  1
                </a>
                <a
                  className="w-10 h-10 text-gray-400 hover:text-blue-600 p-4 inline-flex items-center text-sm font-medium rounded-full"
                  href="#"
                >
                  2
                </a>
                <a
                  className="w-10 h-10 text-gray-400 hover:text-blue-600 p-4 inline-flex items-center text-sm font-medium rounded-full"
                  href="#"
                >
                  3
                </a>
                <a
                  className="text-gray-400 hover:text-blue-600 p-4 inline-flex items-center gap-2 font-medium rounded-md"
                  href="#"
                >
                  <span className="sr-only">Next</span>
                  <span aria-hidden="true">»</span>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
