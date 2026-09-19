"use client";

import { useApp } from "@/context/AppContext";
import { useAuth } from "@/hooks/authStore";
import { useBusinessBySlug } from "@/hooks/useBusinessBySlug";
import { useGreet } from "@/hooks/useGreet";
import { getTodaysDate } from "@/lib/utils/getTodaysDate";
import { useParams } from "next/navigation";

const Page = () => {
  const { getDayOfTheWeek, getMonthOfTheYear, getToday } = getTodaysDate();
  const { slug } = useParams();
  const { me } = useApp();
  const { business } = useBusinessBySlug(slug);
  const { greet } = useGreet();

  const getName = me?.full_name.split(" ");
  console.log(getName);

  return (
    <main className="px-7 lg:px-12 py-7 lg:py-10">
      <div className="">
        <h1 className="text-2xl font-bold">
          {greet}, {getName ? `${getName[0]} ${getName[1]}` : "User"}
        </h1>
        <p className="text-light-text text-xs not-mdfont-light md:text-sm py-2">
          Your {business ? business?.business_name : "business"} workspace is
          fully synchronized • <span>{getDayOfTheWeek}</span>,{" "}
          <span>{getMonthOfTheYear}</span> <span>{getToday}</span>
        </p>
      </div>
    </main>
  );
};

export default Page;
