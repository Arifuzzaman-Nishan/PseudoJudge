import { FC } from "react";

interface SearchProps {
  handleSearch: (query: string) => void;
}

const Search: FC<SearchProps> = ({ handleSearch }) => {
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
        onChange={(e) => handleSearch(e.target.value)}
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

export default Search;
