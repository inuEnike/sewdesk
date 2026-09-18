import type { SubscriptionDTO } from "./subscrition.schema";

export interface subscriptionRepository {
  create(data: SubscriptionDTO): Promise<Subscription | null>;

  findById(id: string): Promise<Subscription | null>;

  findByBusinessId(businessId: string): Promise<Subscription | null>;

  findByBusinessAndPlan(
    businessId: string,
    planId: string,
  ): Promise<Subscription | null>;

  updateStatus(
    id: string,
    status: SUBSCRIPTION_STATUS,
  ): Promise<Subscription | null>;

  activate({
    expiresAt,
    id,
    startedAt,
    status,
  }: activateDTO): Promise<Subscription | null>;
}

export enum SUBSCRIPTION_STATUS {
  PENDING = "pending",
  TRIALING = "trialing",
  ACTIVE = "active",
  EXPIRED = "expired",
  CANCELLED = "cancelled",
}

export interface Subscription {
  id: string;
  business_id: string;
  plan_id: string;
  status: SUBSCRIPTION_STATUS;
  started_at: string | null;
  trial_ends_at: string | null;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface activateDTO {
  id: string;
  startedAt: string;
  expiresAt: string;
  status: SUBSCRIPTION_STATUS;
}
