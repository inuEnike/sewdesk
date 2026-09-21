import { LuClipboardList } from "react-icons/lu";
import KpiCard from "./KpiCard";
import { FaCheckDouble, FaRegClock } from "react-icons/fa6";
import { MdOutlinePayments } from "react-icons/md";
import { FormatCurrency } from "@/lib/utils/FormatCurrency";

const Kpi = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 my-6">
      <KpiCard
        KpiCardTitle="Upcoming Bookings"
        KpiCardValue="9"
        KpiCardIcon={LuClipboardList}
      />
      <KpiCard
        KpiCardTitle="Pending Orders"
        KpiCardIcon={FaRegClock}
        KpiCardValue="28"
        KpiBackgroundIcon="bg-icon-background-orange"
      />
      <KpiCard
        KpiCardTitle="Active Customers"
        KpiCardIcon={FaCheckDouble}
        KpiCardValue="114"
        KpiBackgroundIcon="bg-icon-background-check"

      />
      <KpiCard
        KpiCardTitle="Total Revenue"
        KpiCardIcon={MdOutlinePayments}
        KpiCardValue={FormatCurrency(50000)}
        KpiBackgroundIcon="bg-icon-background-money"

      />
    </div>
  );
};

export default Kpi;
