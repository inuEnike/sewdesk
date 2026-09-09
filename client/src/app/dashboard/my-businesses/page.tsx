"use client";

import React, { useEffect, useState } from "react";

import EmptyState from "@/component/shared/EmptyState";
import SearchInput from "@/component/shared/SearchInput";

import { useApp } from "@/context/AppContext";

import BusinessHeader from "./components/BusinessHeader";
import { BusinessCard } from "./components/BusinessCard";

import { useSearch } from "@/hooks/useSearch";
import SearchToolBar from "./components/SearchToolBar";

export default function YourBusinessesPage(): React.ReactElement {
  const { businesses } = useApp();

  const [currentBusinessId, setCurrentBusinessId] = useState<string | null>(
    null,
  );

  const businessList = businesses ?? [];

  const {
    searchTerm,
    setSearchTerm,
    filteredData: filteredBusinesses,
    resultCount,
    totalCount,
  } = useSearch({
    data: businessList,
    searchKeys: ["business_name", "address"],
  });

  useEffect(() => {
    if (businessList.length > 0 && !currentBusinessId) {
      const savedActiveId = localStorage.getItem("activeBusinessId");

      setCurrentBusinessId(savedActiveId || businessList[0].id);
    }
  }, [businessList, currentBusinessId]);

  const handleSelectBusiness = (id: string): void => {
    setCurrentBusinessId(id);
    localStorage.setItem("activeBusinessId", id);
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground pb-16">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <BusinessHeader />

        {/* Search Toolbar */}
        {businessList.length > 0 && (
          <SearchToolBar
            resultCount={resultCount}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            totalCount={totalCount}
          />
        )}
        {/* Business List or Empty State */}
        {filteredBusinesses.length > 0 ? (
          <div className="grid grid-cols-1 gap-5">
            {filteredBusinesses.map((biz) => (
              <BusinessCard
                key={biz.id}
                business={biz}
                isCurrent={currentBusinessId === biz.id}
                onSelect={() => handleSelectBusiness(biz.id)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            clearSearch={() => setSearchTerm("")}
            isSearch={searchTerm.length > 0}
          />
        )}
      </main>
    </div>
  );
}
