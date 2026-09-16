import { z } from "zod";

export const createSubscriptionSchema = z.object({
  business_id: z.uuid(),
  plan_id: z.uuid(),
});

export type CreateSubscriptionDto = z.infer<typeof createSubscriptionSchema>;
