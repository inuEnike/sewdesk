import React from "react";
import Link from "next/link";
import { Business } from "@/services/business/validation";
import {
  FiArrowRight,
  FiCalendar,
  FiCheckCircle,
  FiMapPin,
  FiMoreVertical,
  FiPhone,
} from "react-icons/fi";

interface BusinessCardProps {
  business: Business;
  isCurrent?: boolean;
  onSelect?: () => void;
}

export const BusinessCard = ({
  business,
  isCurrent = false,
  onSelect,
}: BusinessCardProps): React.ReactElement => {
  const { business_name, address, business_phone, status, slug, created_at } =
    business;

  // Extract initials from business name
  const logoInitials = business_name
    ? business_name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "BI";

  // Format creation date (e.g., "12 Jan 2025")
  const formattedDate = created_at
    ? new Date(created_at).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "N/A";

  const getStatusBadge = (st: string): string => {
    switch (st.toLowerCase()) {
      case "active":
        return "bg-emerald-primary/10 text-emerald-primary border-emerald-primary/20";
      case "pending":
        return "bg-amber-500/10 text-amber-600 border-amber-500/20";
      case "suspended":
        return "bg-danger/10 text-danger border-danger/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div
      className={`relative bg-card text-card-foreground rounded-2xl transition-all duration-200 border ${
        isCurrent
          ? "border-primary shadow-xs ring-1 ring-primary/20"
          : "border-border"
      }`}
    >
      {/* Current Active Indicator Pill */}
      {isCurrent && (
        <div className="absolute -top-3 right-6 bg-primary text-primary-foreground text-[11px] font-semibold px-3 py-0.5 rounded-full shadow-xs flex items-center gap-1">
          <FiCheckCircle className="w-3.5 h-3.5" />
          <span>Active Workspace</span>
        </div>
      )}

      <div className="p-5 sm:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Main Workspace Info */}
          <div className="flex items-start gap-4">
            <div
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl font-bold text-lg flex items-center justify-center shrink-0 border ${
                isCurrent
                  ? "bg-ferra text-ferra-foreground border-ferra"
                  : "bg-icon-background text-icon-color border-border"
              }`}
            >
              {logoInitials}
            </div>

            <div className="space-y-1 w-full">
              <div className="flex items-center flex-wrap gap-2">
                <h3 className="text-lg font-bold text-foreground leading-snug">
                  {business_name}
                </h3>

                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-medium border capitalize ${getStatusBadge(status)}`}
                >
                  {status}
                </span>
              </div>

              <p className="text-sm text-light-text flex items-center gap-1.5 pt-0.5">
                <FiMapPin className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="truncate max-w-md">
                  {address || "No address provided"}
                </span>
              </p>
            </div>
          </div>

          {/* Contextual Actions */}
          <div className="flex items-center gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-border justify-end">
            <Link
              href={`/dashboard/${slug}`}
              onClick={onSelect}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition cursor-pointer shadow-xs ${
                isCurrent
                  ? "bg-primary text-primary-foreground hover:opacity-90"
                  : "bg-card text-foreground border border-border hover:bg-muted"
              }`}
            >
              <span>{isCurrent ? "Open Dashboard" : "Switch to Business"}</span>
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Workspace Metadata Footer */}
        <div className="mt-5 pt-4 border-t w-full border-border grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-light-text">
          <div className="flex items-center gap-1.5">
            <FiPhone className="w-3.5 h-3.5 text-muted-foreground" />
            <span>{business_phone || "N/A"}</span>
          </div>

          <div className="flex items-center gap-1.5 col-span-2 sm:col-span-1">
            <FiCalendar className="w-3.5 h-3.5 text-muted-foreground" />
            <span>Created {formattedDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
