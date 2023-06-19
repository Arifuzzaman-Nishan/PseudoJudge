import { Table } from "@tanstack/react-table";
import React, { FC, useEffect, useState } from "react";
import "animate.css";

interface PaginationProps {
  table: Table<any>;
  total: number;
  current: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

const Pagination: FC<PaginationProps> = ({
  table,
  total,
  current,
  hasNextPage,
  hasPreviousPage,
}) => {
  // const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState<any>([]);

  const getPagesArray = (
    currentPage: number,
    total: number
  ): (string | number)[] => {
    const maxVisiblePages = 6;

    // Helper function to add a range to the array
    const addRange = (start: number, end: number, arr: (string | number)[]) => {
      for (let i = start; i <= end; i++) {
        arr.push(i);
      }
    };

    if (total <= maxVisiblePages) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    let updatedPages: (string | number)[] = [];
    if (currentPage <= 3) {
      addRange(1, 4, updatedPages);
      updatedPages.push("...");
      addRange(total - 1, total, updatedPages);
    } else if (currentPage > 3 && currentPage < total - 3) {
      addRange(1, 2, updatedPages);
      updatedPages.push("...");
      addRange(currentPage - 1, currentPage + 1, updatedPages);
      updatedPages.push("...");
      addRange(total - 1, total, updatedPages);
    } else {
      addRange(1, 2, updatedPages);
      updatedPages.push("...");
      addRange(currentPage - 1, total, updatedPages);
    }

    return updatedPages;
  };

  useEffect(() => {
    setPages(getPagesArray(current, total));
  }, [current, total]);

  return (
    <div className="py-1 px-4">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => table.previousPage()}
          disabled={!hasPreviousPage}
          className="text-gray-400 hover:text-blue-600 p-4 inline-flex items-center gap-2 font-medium rounded-md"
        >
          <span aria-hidden="true">«</span>
          <span className="sr-only">Previous</span>
        </button>

        {pages.map((page: any, index: number) => {
          if (typeof page === "number") {
            return (
              <button
                onClick={() => table.setPageIndex(page - 1)}
                key={index}
                className={`animate__animated animate__fadeIn transition-all duration-300 ease-in-out w-10 h-10 p-4 inline-flex items-center text-sm font-medium rounded-full ${
                  current === page
                    ? "bg-blue-500 text-white"
                    : "text-gray-400 hover:text-blue-600"
                }`}
              >
                {page}
              </button>
            );
          } else {
            return (
              <span
                key={index}
                className="w-10 h-10  p-4 inline-flex items-center text-sm font-medium rounded-full px-2 sm:px-4 py-1 sm:py-2 m-1 border border-transparent  sm:text-base  text-gray-500 bg-blue-100"
              >
                {page}
              </span>
            );
          }
        })}

        <button
          onClick={() => table.nextPage()}
          disabled={!hasNextPage}
          className="text-gray-400 hover:text-blue-600 p-4 inline-flex items-center gap-2 font-medium rounded-md"
        >
          <span className="sr-only">Next</span>
          <span aria-hidden="true">»</span>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
