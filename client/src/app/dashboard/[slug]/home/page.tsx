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
import RecentOrders from "../../_components/RecentOrders";
import OutstandingPayments from "../../_components/OutstandingPayments";

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
            {greet}, <span className="text-primary"> {getName ? `${getName[0]} ${getName[1]}` : "User"}!</span>👋
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

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.5fr] gap-7 my-6">
          <OutstandingPayments />
          <RecentOrders />
        </div>
      </section>
    </main>
  );
};

export default Page;
