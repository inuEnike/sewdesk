import React from "react";
import { FiSearch, FiX } from "react-icons/fi";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
}: SearchInputProps) {
  return (
    <div className="relative w-full">
      <FiSearch
        className="absolute left-3.5 top-1/2 -translate-y-1/2
        text-muted-foreground w-4 h-4"
      />

      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          pl-10
          pr-10
          py-2.5
          bg-card
          border
          border-border
          rounded-xl
          text-xs
          text-foreground
          outline-none
          transition
       
        "
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="
            absolute right-3
            top-1/2
            -translate-y-1/2
            text-muted-foreground
            hover:text-foreground
            cursor-pointer
          "
          aria-label="Clear search"
        >
          <FiX className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
