import React from "react";
import Link from "next/link";
import { Business } from "@/services/business/validation";
import {
  FiArrowRight,
  FiCalendar,
  FiCheckCircle,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";

export const BUSINESS_STATUS = {
  PENDING: "pending",
  ACTIVE: "active",
  SUSPENDED: "suspended",
} as const;

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

  const isPending = status?.toLowerCase() === BUSINESS_STATUS.PENDING;

  // Dynamic link destination
  const targetHref = isPending
    ? `/checkout/${slug}` // Replace with your checkout/payment route
    : `/dashboard/${slug}`;

  // Dynamic button label
  const getButtonLabel = () => {
    if (isPending) return "Proceed to Payment";
    if (isCurrent) return "Open Dashboard";
    return "Switch to Business";
  };

  // Extract initials from business name
  const logoInitials = business_name
    ? business_name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "BI";

  // Format creation date
  const formattedDate = created_at
    ? new Date(created_at).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      })
    : "N/A";

  const getStatusBadge = (st: string): string => {
    switch (st.toLowerCase()) {
      case BUSINESS_STATUS.ACTIVE:
        return "bg-emerald-primary/10 text-emerald-primary border-emerald-primary/20";
      case BUSINESS_STATUS.PENDING:
        return "bg-amber-500/10 text-amber-600 border-amber-500/20";
      case BUSINESS_STATUS.SUSPENDED:
        return "bg-danger/10 text-danger border-danger/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div
      className={`relative w-full bg-card text-card-foreground rounded-2xl transition-all duration-200 border ${
        isCurrent
          ? "border-primary shadow-xs ring-1 ring-primary/20"
          : "border-border"
      }`}
    >
      {/* Current Active Indicator */}
      {isCurrent && (
        <div className="absolute -top-3 right-4 sm:right-6 bg-primary text-primary-foreground text-[11px] font-semibold px-3 py-0.5 rounded-full shadow-xs flex items-center gap-1 whitespace-nowrap">
          <FiCheckCircle className="w-3.5 h-3.5 shrink-0" />
          <span>Active Workspace</span>
        </div>
      )}

      <div className="p-4 sm:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 md:gap-6">
          {/* Main Workspace Info */}
          <div className="flex items-start gap-3 sm:gap-4 min-w-0 flex-1">
            {/* Logo */}
            <div
              className={`w-11 h-11 sm:w-14 sm:h-14 rounded-xl font-bold text-base sm:text-lg flex items-center justify-center shrink-0 border ${
                isCurrent
                  ? "bg-ferra text-ferra-foreground border-ferra"
                  : "bg-icon-background text-icon-color border-border"
              }`}
            >
              {logoInitials}
            </div>

            {/* Business Details */}
            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug wrap-break-words">
                  {business_name}
                </h3>

                <span
                  className={`self-start sm:self-auto shrink-0 text-[11px] sm:text-xs px-2.5 py-0.5 rounded-full font-medium border capitalize ${getStatusBadge(
                    status
                  )}`}
                >
                  {status}
                </span>
              </div>

              <p className="text-xs text-light-text flex items-start gap-1.5 pt-0.5 min-w-0">
                <FiMapPin className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                <span className="wrap-break-word leading-relaxed">
                  {address || "No address provided"}
                </span>
              </p>
            </div>
          </div>

          {/* Contextual Actions */}
          <div className="w-full md:w-auto flex items-center pt-3 md:pt-0 border-t md:border-t-0 border-border">
            <Link
              href={targetHref}
              onClick={onSelect}
              className={`w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition cursor-pointer shadow-xs ${
                isPending || isCurrent
                  ? "bg-primary text-primary-foreground hover:opacity-90"
                  : "bg-card text-foreground border border-border hover:bg-muted"
              }`}
            >
              <span className="truncate">{getButtonLabel()}</span>
              <FiArrowRight className="w-4 h-4 shrink-0" />
            </Link>
          </div>
        </div>

        {/* Workspace Metadata Footer */}
        <div className="mt-5 pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-light-text">
          <div className="flex items-center gap-1.5 min-w-0">
            <FiPhone className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <span className="break-all">{business_phone || "N/A"}</span>
          </div>

          <div className="flex items-center gap-1.5 min-w-0">
            <FiCalendar className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <span>Created {formattedDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};