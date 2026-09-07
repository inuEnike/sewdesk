import Heading from "@/component/shared/Heading";
import React from "react";
import PricingCard from "../pricing/PricingCard";
import ProcessCard from "./ProcessCard";
import { processList } from "@/lib/utils/process";

const Process = () => {
  return (
    <section className="bg-background">
      <div className="h-auto py-20 not-lg:px-5 w-full lg:w-[85%] xl:w-[70%] m-auto">
        <Heading
          eyebrow="Simple Process"
          title="Transform your shop in 3 easy steps."
        />
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 xl:gap-7 py-5">
          {processList.map((process, key) => (
            <ProcessCard
              key={key}
              description={process.description}
              listNumber={process.listNumber}
              title={process.title}
            />
          ))}
        </section>
      </div>
    </section>
  );
};

export default Process;
