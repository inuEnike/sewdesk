import { SubscriptionService } from "@/services/business/subscription/subscription.service";
import { SubscriptionResponse } from "@/services/business/subscription/subscription.type";
import { useEffect, useState } from "react";

export const useSubByBusinessId = (businessId: string) => {
  const [subscription, setSubscription] = useState<SubscriptionResponse | null>(
    null,
  );

  useEffect(() => {
    const getSubByBusinessId = async () => {
      try {
        const subscription =
          await SubscriptionService.getByBusinessId(businessId);

        //   console.log(subscription?.data);
          
        setSubscription(subscription?.data);
      } catch (error) {
        console.error("GET SUBSCRIPTION ERROR:", error);
        setSubscription(null);
      }
    };

    getSubByBusinessId();
  }, [businessId]);

  return {
    subscription,
    setSubscription,
  };
};
