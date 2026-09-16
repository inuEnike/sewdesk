import { z } from "zod";

import { SUBSCRIPTION_STATUS } from "./subscription.types";

export const subscriptionSchema = z.object({
  business_id: z.uuid(),
  plan_id: z.uuid(),
});

export const updateSubscriptionSchema = z.object({
  status: z.enum(SUBSCRIPTION_STATUS).optional(),
});

export type SubscriptionDTO = z.infer<typeof subscriptionSchema>;

export type UpdateSubscriptionDTO = z.infer<typeof updateSubscriptionSchema>;
