import { BUSINESS_STATUS } from "@/app/dashboard/my-businesses/components/BusinessStatus";

export const getStatusBadge = (st: string): string => {
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
