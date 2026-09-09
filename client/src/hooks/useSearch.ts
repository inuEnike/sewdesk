import { useMemo, useState } from "react";

type UseSearchOptions<T> = {
  data: T[];
  searchKeys: (keyof T)[];
};

export function useSearch<T>({ data, searchKeys }: UseSearchOptions<T>) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return data;
    }

    return data.filter((item) =>
      searchKeys.some((key) => {
        const value = item[key];

        return String(value ?? "")
          .toLowerCase()
          .includes(query);
      }),
    );
  }, [data, searchKeys, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredData,
    isSearching: searchTerm.trim().length > 0,
    resultCount: filteredData.length,
    totalCount: data.length,
  };
}
