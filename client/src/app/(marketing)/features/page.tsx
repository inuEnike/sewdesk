import Hero from "@/component/shared/Hero";
import React from "react";
import FeatureHeader from "./components/FeatureHeader";
import FeaturePreviewCard from "./components/FeaturePreviewCard";
import { FeatureData } from "@/lib/utils/featureDaata";
import PricingCard from "../_components/pricing/PricingCard";
import { Plans } from "@/lib/utils/sewdeskPlans";

const Features = () => {
  return (
    <section>
      <Hero
        eyebrow="Premium Capabilities"
        title="Engineered to solve real tailoring challenges."
        body="Discover the complete suite of features that help busy Nigerian tailors
        and design hubs grow their brand authority and operational sanity."
      />

      <section className="bg-background-secondary">
        <div className="h-auto xl:h-h195 py-20 not-lg:px-5 w-full lg:w-[85%] xl:w-[70%] m-auto flex flex-col  gap-14">
          {FeatureData.map((data, key) => (
            <div
              className={`flex not-md:flex-col justify-between w-full gap-5 my-7 ${data.align !== "left" && "flex-row-reverse"}`}
              key={key}
            >
              <FeatureHeader
                badge={data.badge}
                description={data.description}
                id={data.id}
                title={data.title}
              />
              <FeaturePreviewCard
                details={data?.previewCard?.details}
                title={data.previewCard.title}
              />
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default Features;
