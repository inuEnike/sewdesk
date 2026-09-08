import PricingCard from "@/app/(marketing)/_components/pricing/PricingCard";
import { Plans } from "@/lib/utils/sewdeskPlans";

const Price = () => {
  return (
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
  );
};

export default Price;
