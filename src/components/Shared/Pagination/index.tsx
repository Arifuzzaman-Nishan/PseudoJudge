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
    <div className="flex justify-center mt-10 space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar">
      <button
        onClick={() => table.previousPage()}
        className="animate__animated animate__fadeIn transition-all duration-300 ease-in-out px-2 sm:px-4 py-1 sm:py-2 m-1 text-sm sm:text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
        disabled={!hasPreviousPage}
      >
        Prev
      </button>
      {pages.map((page: any, index: number) => {
        if (typeof page === "number") {
          return (
            <button
              onClick={() => table.setPageIndex(page - 1)}
              key={index}
              className={`animate__animated animate__fadeIn transition-all duration-300 ease-in-out px-2 sm:px-4 py-1 sm:py-2 m-1 text-sm sm:text-base font-medium rounded-full focus:outline-none ${
                current === page
                  ? "text-white bg-blue-600 hover:bg-blue-700"
                  : "text-blue-700 bg-blue-200 hover:bg-blue-300"
              }`}
            >
              {page}
            </button>
          );
        } else {
          return (
            <span
              key={index}
              className="inline-flex items-center px-2 sm:px-4 py-1 sm:py-2 m-1 border border-transparent text-sm sm:text-base font-medium rounded-full text-gray-500 bg-blue-100"
            >
              {page}
            </span>
          );
        }
      })}
      <button
        onClick={() => table.nextPage()}
        className="animate__animated animate__fadeIn transition-all duration-300 ease-in-out px-2 sm:px-4 py-1 sm:py-2 m-1 text-sm sm:text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
        disabled={!hasNextPage}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
