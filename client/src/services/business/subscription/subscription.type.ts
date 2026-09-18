import { z } from "zod";

export enum SUBSCRIPTION_STATUS {
  PENDING = "pending",
  TRIALING = "trialing",
  ACTIVE = "active",
  EXPIRED = "expired",
  CANCELLED = "cancelled",
}

export const createSubscriptionSchema = z.object({
  business_id: z.uuid(),
  plan_id: z.uuid(),
});

export type CreateSubscriptionDto = z.infer<typeof createSubscriptionSchema>;

export const subscriptionResponseSchema = z.object({
  id: z.uuid(),
  business_id: z.uuid(),
  plan_id: z.uuid(),
  status: z.enum(SUBSCRIPTION_STATUS),
  started_at: z.coerce.date().nullable(),
  expires_at: z.coerce.date().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  trial_ends_at: z.coerce.date().nullable(),
});

export type SubscriptionResponse = z.infer<typeof subscriptionResponseSchema>;
