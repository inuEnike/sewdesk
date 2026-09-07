import Heading from "@/component/shared/Heading";
import React from "react";
import PricingCard from "./PricingCard";
import { Plans } from "@/lib/utils/sewdeskPlans";

const Pricing = () => {
  return (
    <section className="bg-background-secondary">
      <div className="h-auto py-20 not-lg:px-5 w-full lg:w-[85%] xl:w-[70%] m-auto">
        <Heading
          eyebrow="Simple, Transparent Pricing"
          title="A plan for every size of workshop."
        />
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 xl:gap-7 py-5">
          {Plans.map((plan) => (
            <PricingCard
              key={plan.id}
              title={plan.name}
              description={plan.description}
              price={plan.price}
              period={plan.period}
              cta={plan.cta}
              badge={plan.badge}
              features={plan.features}
            />
          ))}
        </section>
      </div>
    </section>
  );
};

export default Pricing;
