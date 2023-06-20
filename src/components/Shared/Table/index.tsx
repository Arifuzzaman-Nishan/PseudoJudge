import debounce from "@/utils/debounce/debounce";
import { HeaderGroup, Row, flexRender } from "@tanstack/react-table";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";

type Props = {
  headers: HeaderGroup<any>[];
  rows: Row<any>[];
  data: any[];
  content: React.JSX.Element;
  handleRowClick?: (row: any) => void;
  children?: React.ReactNode;
  filter?: React.ReactNode;
};

const Table: FC<Props> = ({ children, headers, rows, filter, ...rest }) => {
  const { data, content, handleRowClick } = rest;

  const [query, setQuery] = useState("");

  // const debounceFetch = useCallback((query: string) => {
  //   const debouncedFetch = debounce(async (q: string) => {
  //     console.log("fetching data...", query);
  //   }, 3000);

  //   debouncedFetch(query);
  // }, []);

  // const debounceFetch2 = useMemo(
  //   () =>
  //     debounce((query) => {
  //       console.log("fetching data...", query);
  //     }, 3000),
  //   []
  // );

  const debounceFetch = useRef((query: string) =>
    debounce((query: string) => {
      console.log("fetching data...", query);
    }, 3000)
  );

  useEffect(() => {
    console.log("inside useEffect...");

    if (query) {
      debounceFetch.current(query);
    } else {
      console.log("query is empty");
    }
  }, [debounceFetch, query]);

  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="border rounded-lg divide-y divide-gray-200">
            <div className="py-3 px-4">
              <div className="flex items-center justify-between">
                <div className="relative max-w-xs flex-1">
                  <Search setQuery={setQuery} />
                </div>
                <div className="max-w-xs flex-1">{filter}</div>
              </div>
            </div>
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 border-collapse">
                <thead className="bg-gray-50">
                  {headers.map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          key={header.id}
                          colSpan={header.colSpan}
                          scope="col"
                        >
                          {header.isPlaceholder ? null : (
                            <div>
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </div>
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {rows.map((row) => (
                    <tr
                      className="hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleRowClick?.(row?.original)}
                      key={row.id}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 "
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

interface SearchProps {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const Search: FC<SearchProps> = ({ setQuery }) => {
  return (
    <>
      <label htmlFor="hs-table-with-pagination-search" className="sr-only">
        Search
      </label>
      <input
        type="text"
        name="hs-table-with-pagination-search"
        id="hs-table-with-pagination-search"
        className="p-3 pl-10 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 border"
        placeholder="Search for items"
        onChange={(e) => setQuery(e.target.value)}
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
    </>
  );
};

export default Table;
