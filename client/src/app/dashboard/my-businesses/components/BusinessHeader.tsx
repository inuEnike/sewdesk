import Button from "@/component/ui/Button";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";

const BusinessHeader = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-8 border-b border-border">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-icon-background text-icon-color text-xs font-semibold mb-2 border border-border">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Workspace Selector
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
          Your Businesses
        </h1>
        <p className="text-light-text text-xs mt-1">
          Manage and access all your tailoring outlets and fashion houses from
          one place.
        </p>
      </div>

      <Link href={"/dashboard/create-business"} className="flex items-center gap-3">
        <Button children="Create a Business" />
      </Link>
    </div>
  );
};

export default BusinessHeader;
