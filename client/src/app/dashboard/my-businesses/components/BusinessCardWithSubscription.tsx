import { useSubByBusinessId } from "@/hooks/useSubByBusinessId";
import { BusinessCard, BusinessCardProps } from "./BusinessCard";

export const BusinessCardWithSubscription = ({
  business,
  isCurrent,
  onSelect,
}: BusinessCardProps) => {
  const { subscription } = useSubByBusinessId(business.id);

  return (
    <BusinessCard
      business={business}
      subscription={subscription}
      isCurrent={isCurrent}
      onSelect={onSelect}
    />
  );
};
