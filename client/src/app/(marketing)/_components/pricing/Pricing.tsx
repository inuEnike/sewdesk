import Heading from "@/component/shared/Heading";
import MarketingPrice from "@/component/shared/MArketingPrice";

const Pricing = () => {
  return (
    <section className="bg-background-secondary">
      <div className="h-auto py-20 not-lg:px-5 w-full lg:w-[85%] xl:w-[70%] m-auto">
        <Heading
          eyebrow="Simple, Transparent Pricing"
          title="A plan for every size of workshop."
        />
        <MarketingPrice />
      </div>
    </section>
  );
};

export default Pricing;
