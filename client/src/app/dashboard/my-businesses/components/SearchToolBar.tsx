import SearchInput from "@/component/shared/SearchInput";
import { Business } from "@/services/business/validation";
import React from "react";

type SearchToolBar = {
  resultCount: number;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string;
  totalCount: number;
};
const SearchToolBar = ({
  resultCount,
  searchTerm,
  setSearchTerm,
  totalCount,
}: SearchToolBar) => {
  return (
    <div className="my-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
      <div className="relative flex-1 max-w-md">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search business by name or location..."
        />
      </div>

      <div className="text-xs text-light-text font-medium self-end sm:self-center">
        Showing <span className="font-bold text-foreground">{resultCount}</span>{" "}
        of <span className="font-bold text-foreground">{totalCount}</span>{" "}
        workspaces
      </div>
    </div>
  );
};

export default SearchToolBar;
