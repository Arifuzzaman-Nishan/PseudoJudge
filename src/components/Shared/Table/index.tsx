import { HeaderGroup, Row, flexRender } from "@tanstack/react-table";
import { FC } from "react";

type Props = {
  headers: HeaderGroup<any>[];
  rows: Row<any>[];
  data: any[];
  content: React.JSX.Element;
  handleRowClick?: (row: any) => void;
};

const Table: FC<Props> = ({ headers, rows, ...rest }) => {
  const { data, content, handleRowClick } = rest;

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
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
              <tbody className={`bg-white divide-y divide-gray-200`}>
                {rows.map((row) => (
                  <tr
                    className="hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleRowClick?.(row?.original)}
                    key={row.id}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td>{content}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
