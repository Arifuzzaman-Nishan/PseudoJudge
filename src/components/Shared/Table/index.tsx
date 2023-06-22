"use client";
import { HeaderGroup, Row, flexRender } from "@tanstack/react-table";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";

type Props = {
  headers: HeaderGroup<any>[];
  rows: Row<any>[];
  data: any[];
  content: React.JSX.Element;
  handleRowClick?: (row: any) => void;
  PaginationCP?: React.ReactNode;
  SearchCP?: React.ReactNode;
  filterCP?: React.ReactNode;
};

const Table: FC<Props> = ({
  PaginationCP,
  SearchCP,
  headers,
  rows,
  filterCP,
  ...rest
}) => {
  const { data, content, handleRowClick } = rest;

  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="border rounded-lg divide-y divide-gray-200">
            <div className="py-3 px-4">
              <div className="flex items-center justify-between">
                <div className="relative max-w-xs flex-1">{SearchCP}</div>
                <div className="max-w-xs flex-1">{filterCP}</div>
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
            {PaginationCP}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
