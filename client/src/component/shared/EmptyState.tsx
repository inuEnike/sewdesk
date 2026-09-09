import React from "react";
import { FiBriefcase, FiPlus, FiSearch } from "react-icons/fi";

interface EmptyStateProps {
  clearSearch?: () => void;
  isSearch?: boolean;
  onCreateBusiness?: () => void;
}

const EmptyState = ({
  clearSearch,
  isSearch = false,
  onCreateBusiness,
}: EmptyStateProps): React.ReactElement => {
  if (isSearch) {
    return (
      <div className="bg-card rounded-2xl border border-border p-12 text-center max-w-xl mx-auto my-8">
        <div className="w-12 h-12 rounded-full bg-muted text-muted-foreground flex items-center justify-center mx-auto mb-3">
          <FiSearch className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-foreground">
          No matching businesses found
        </h3>
        <p className="text-sm text-light-text mt-1">
          We couldn't find any business matching your search filter.
        </p>
        {clearSearch && (
          <button
            onClick={clearSearch}
            className="mt-4 inline-flex items-center justify-center px-4 py-2 rounded-lg bg-muted text-foreground text-xs font-semibold hover:bg-border transition cursor-pointer"
          >
            Clear Filter
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl border border-dashed border-border p-8 sm:p-14 text-center max-w-xl mx-auto my-12 shadow-xs">
      <div className="w-16 h-16 rounded-2xl bg-icon-background text-icon-color flex items-center justify-center mx-auto mb-4 border border-border">
        <FiBriefcase className="w-8 h-8" />
      </div>

      <h2 className="text-xl font-bold text-foreground tracking-tight">
        No businesses registered yet
      </h2>

      <p className="text-light-text text-sm mt-2 max-w-md mx-auto leading-relaxed">
        Get started by adding your first workshop or atelier. You'll be able to
        manage orders, customer measurements, and fabrics right away.
      </p>

      {onCreateBusiness && (
        <div className="mt-6">
          <button
            onClick={onCreateBusiness}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 active:opacity-100 shadow-md transition cursor-pointer"
          >
            <FiPlus className="w-4 h-4 stroke-[2.5]" />
            <span>Create Your First Business</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default EmptyState;
