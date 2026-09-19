"use client";

import { getTodaysDate } from "@/lib/utils/getTodaysDate";

const Page = () => {
  const { getDayOfTheWeek, getMonthOfTheYear, getToday } = getTodaysDate();

  return (
    <main className="px-7 lg:px-12 py-7 lg:py-10">
      <div className="">
        <h1 className="text-2xl font-bold">Good Morning, Alexandro</h1>
        <p className="text-light-text text-xs not-mdfont-light md:text-sm py-2">
          Sartoria Rossi Milano workspace is fully synchronized •{" "}
          <span>{getDayOfTheWeek}</span>, <span>{getMonthOfTheYear}</span>{" "}
          <span>{getToday}</span>
        </p>
      </div>
    </main>
  );
};

export default Page;
