import SearchInput from "@/component/shared/SearchInput";
import { useBusinessBySlug } from "@/hooks/useBusinessBySlug";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { ParamValue } from "next/dist/server/request/params";
import { RxAvatar, RxHamburgerMenu } from "react-icons/rx";

const TopBar = ({
  onclick,
  slug,
}: {
  onclick: () => void;
  slug: ParamValue;
}) => {
  const { business } = useBusinessBySlug(slug);
  const { isOnline } = useOnlineStatus();

  return (
    <nav className="bg-white px-7 lg:px-12 py-5 shadow-xs flex items-center justify-between sticky top-0">
      <div className="flex items-center gap-4">
        <button className="md:hidden" onClick={onclick}>
          <RxHamburgerMenu className="text-background-sidebar font-bold" />
        </button>
        <h2 className="text-xl font-bold">Dashboard</h2>
        <div className="bg-icon-background px-2 gap-1 py-2 flex items-center">
          <span className="text-xs text-primary font-semibold">
            {isOnline ? "Live" : "Offline"}
          </span>
          <div className="bg-primary w-2 h-2 rounded-full animate-pulse">
            <span className=""></span>
          </div>
        </div>
      </div>
      <div className="">
        <div className="flex items-center gap-2">
          <RxAvatar className="text-2xl text-light-text font-bold" />
          <span className="text-sm not-sm:hidden text-light-text">
            Welcome, {business?.business_name ? business.business_name : "user"}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
