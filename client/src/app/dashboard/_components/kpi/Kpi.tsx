import { LuClipboardList } from "react-icons/lu";
import KpiCard from "./KpiCard";
import { FaCheckDouble, FaRegClock } from "react-icons/fa6";
import { MdOutlinePayments } from "react-icons/md";
import { FormatCurrency } from "@/lib/utils/FormatCurrency";

const Kpi = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
      <KpiCard
        KpiCardTitle="Total Orders"
        KpiCardValue="142"
        KpiCardIcon={LuClipboardList}
      />
      <KpiCard
        KpiCardTitle="Pending Orders"
        KpiCardIcon={FaRegClock}
        KpiCardValue="28"
        KpiBackgroundIcon="bg-icon-background-orange"
      />
      <KpiCard
        KpiCardTitle="Completed Orders"
        KpiCardIcon={FaCheckDouble}
        KpiCardValue="114"
        KpiBackgroundIcon="bg-icon-background-check"

      />
      <KpiCard
        KpiCardTitle="Outstanding Payments"
        KpiCardIcon={MdOutlinePayments}
        KpiCardValue={FormatCurrency(500000)}
        KpiBackgroundIcon="bg-icon-background-money"

      />
    </div>
  );
};

export default Kpi;
