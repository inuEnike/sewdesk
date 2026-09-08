import Hero from "@/component/shared/Hero";
import Price from "@/component/shared/Price";
import PlanComparisonTable from "./PlanComparisonTable";

const Page = () => {
  return (
    <>
      <Hero
        eyebrow="Transparent Pricing"
        title="Plans designed for sewing shops of all sizes."
        body="Choose the right operational toolset for your team. Switch plans or cancel anytime with full data protection guarantees."
      />

      <section className="bg-background-secondary">
        <div className="h-auto xl:h-h195 py-20 not-lg:px-5 w-full lg:w-[85%] xl:w-[70%] m-auto flex flex-col gap-14">
          <Price />
          <PlanComparisonTable />
        </div>
      </section>
    </>
  );
};

export default Page;
