"use client";
import PricingCard from "@/app/(marketing)/_components/pricing/PricingCard";
import PlanComparisonTable from "@/app/(marketing)/pricing/PlanComparisonTable";
import Price from "@/component/shared/Price";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const { id } = useParams();
  return (
    <div>
      <section className="bg-background-secondary">
        <div className="h-auto xl:h-h195 py-20 not-lg:px-5 w-full lg:w-[85%] xl:w-[70%] m-auto flex flex-col gap-14">
          <Price />
          {/* <PlanComparisonTable /> */}
        </div>
      </section>
    </div>
  );
};

export default Page;
