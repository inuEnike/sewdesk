import Heading from "@/component/shared/Heading";
import React from "react";
import PricingCard from "./PricingCard";
import { Plans } from "@/lib/utils/sewdeskPlans";
import Price from "@/component/shared/Price";

const Pricing = () => {
  return (
    <section className="bg-background-secondary">
      <div className="h-auto py-20 not-lg:px-5 w-full lg:w-[85%] xl:w-[70%] m-auto">
        <Heading
          eyebrow="Simple, Transparent Pricing"
          title="A plan for every size of workshop."
        />
        <Price />
      </div>
    </section>
  );
};

export default Pricing;
