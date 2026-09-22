"use client";

import { useApp } from "@/context/AppContext";
import { useBusinessBySlug } from "@/hooks/useBusinessBySlug";
import { useGreet } from "@/hooks/useGreet";
import { getTodaysDate } from "@/lib/utils/getTodaysDate";
import { useParams } from "next/navigation";
import Kpi from "../../_components/kpi/Kpi";
import RevenueCard from "../../_components/RevenueCard";
import Button from "@/component/ui/Button";
import OutlineButton from "@/component/ui/OutlineButton";
import { IoAdd, IoPeople } from "react-icons/io5";
import Link from "next/link";
import FittingsCard from "../../_components/FittingsCard";
import { orderData } from "@/lib/seed/orderData";
import { FormatCurrency } from "@/lib/utils/FormatCurrency";
import { formattedDate } from "@/lib/utils/formattedDate";

const Page = () => {
  const { getDayOfTheWeek, getMonthOfTheYear, getToday } = getTodaysDate();
  const { slug } = useParams();
  const { me } = useApp();
  const { business } = useBusinessBySlug(slug);
  const { greet } = useGreet();

  const getName = me?.full_name.split(" ");

  return (
    <main className="px-5 lg:px-12 py-7 lg:py-10">
      <div className="flex justify-between not-lg:flex-col not-lg:gap-3">
        <div className="">
          <h1 className="text-2xl font-bold">
            {greet}, {getName ? `${getName[0]} ${getName[1]}` : "User"}!👋
          </h1>
          <p className="text-light-text text-xs not-mdfont-light md:text-sm py-1">
            Here is the latest snapshot of your{" "}
            {business ? business?.business_name : "business"} workshop today. •{" "}
            <span>{getDayOfTheWeek}</span>, <span>{getMonthOfTheYear}</span>{" "}
            <span>{getToday}</span>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button children="New Order" Icon={IoAdd} />
          <OutlineButton Icon={IoPeople} children="Add Customer" />
        </div>
      </div>
      <section>
        <Kpi />
        <div className="grid grid-cols-1 xl:grid-cols-[1.7fr_1fr] gap-7">
          <RevenueCard />
          <FittingsCard />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1.3fr_1.5fr] gap-7 my-6">
          <div className="bg-white p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Active Fashion Orders</h3>
              <Link
                href={"/dashboard/home"}
                className="text-xs text-primary font-semibold"
              >
                View All Orders
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="my-5 w-full border-separsate">
                <thead className="bg-background rounded-md w-full">
                  <tr className="text-left text-xs rounded-md!">
                    <th className="font-medium py-3 px-2 rounded-lg!">
                      Order Id
                    </th>
                    <th className="font-medium py-3 px-2">Customer</th>
                    <th className="font-medium py-3 px-2">Garment Style</th>
                    <th className="font-medium py-3 px-2">Status</th>
                    <th className="font-medium py-3 px-2">Amount</th>
                    <th className="font-medium py-3 px-2 rounded-lg!">
                      Due Date
                    </th>
                  </tr>
                </thead>
                <thead className="">
                  {orderData.slice(0, 5).map((data) => (
                    <tr className="shadow-xs text-xs">
                      <td className="py-5 font-semibold px-2 text-xs">
                        {data.orderId}
                      </td>
                      <td className="py-5 font-light px-2 text-xs">
                        {data.customer}
                      </td>
                      <td className="py-5 font-semibold text-light-text px-2 text-xs">
                        {data.garmentStyle}
                      </td>
                      <td className="py-5 font-light text-center px-2 text-xs">
                        <div
                          className={`${data.status === "In Progress" ? "bg-icon-background" : data.status === "Cancelled" ? "bg-icon-background-orange" : data.status === "Pending" ? "bg-icon-background-orange" : "bg-icon-background-check"} p-1 rounded-full`}
                        >
                          {data.status}
                        </div>
                      </td>
                      <td className="py-5 font-light px-2 text-xs">
                        {data.amountDue && FormatCurrency(data.amountDue)}
                      </td>
                      <td className="py-5 font-light px-2 text-xs">
                        {data.date && formattedDate(data.date)}
                      </td>
                    </tr>
                  ))}
                </thead>
              </table>
            </div>
          </div>
          <div className="bg-white">q</div>
        </div>
      </section>
    </main>
  );
};

export default Page;
