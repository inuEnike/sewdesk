"use client";

import { useApp } from "@/context/AppContext";
import { useBusinessBySlug } from "@/hooks/useBusinessBySlug";
import { useGreet } from "@/hooks/useGreet";
import { getTodaysDate } from "@/lib/utils/getTodaysDate";
import { useParams } from "next/navigation";
import Kpi from "../../_components/kpi/Kpi";
import { orderData } from "@/lib/seed/orderData";
import RevenueCard from "../../_components/RevenueCard";
import Button from "@/component/ui/Button";
import OutlineButton from "@/component/ui/OutlineButton";
import { IoAdd, IoPeople } from "react-icons/io5";

const Page = () => {
  const { getDayOfTheWeek, getMonthOfTheYear, getToday } = getTodaysDate();
  const { slug } = useParams();
  const { me } = useApp();
  const { business } = useBusinessBySlug(slug);
  const { greet } = useGreet();

  const getName = me?.full_name.split(" ");

  return (
    <main className="px-5 lg:px-12 py-7 lg:py-10">
      <div className="flex justify-between not-md:flex-col not-md:gap-3">
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
          <Button children="New Order" Icon={IoAdd} showIcon/>
          <OutlineButton Icon={IoPeople} showIcon={true} children="Add Customer"/>
        </div>
      </div>
      <section>
        <Kpi />
        <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_1fr] gap-7">
          <RevenueCard />
          <div className="bg-white p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Fittings & Appointments</h3>
              <p className="text-xs text-primary font-semibold">View All</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
