import {
  BAD_REQUST_EXCEPTION,
  CONFLICT_EXCEPTION,
  NOT_FOUND_EXCEPTION,
} from "../../../../middleware/error.middleware";
import { BUSINESS_STATUS, type Repository } from "../core/business.types";
import {
  SUBSCRIPTION_STATUS,
  type Subscription,
  type subscriptionRepository,
} from "./subscription.types";
import type {
  SubscriptionDTO,
  UpdateSubscriptionDTO,
} from "./subscrition.schema";

export class SubscriptionService {
  constructor(
    private readonly subscriptionRepository: subscriptionRepository,
    private readonly businessRepository: Repository,
  ) {}

  async create(data: SubscriptionDTO): Promise<Subscription | null> {
    const existingSubscription =
      await this.subscriptionRepository.findByBusinessId(data.business_id);

    if (existingSubscription) {
      throw new CONFLICT_EXCEPTION("Business already has a subscription");
    }

    const subscription = await this.subscriptionRepository.create(data);

    if (!subscription) {
      throw new BAD_REQUST_EXCEPTION("Unable to create subscription");
    }
    await this.businessRepository.updateBusinessStatus(
      data.business_id,
      BUSINESS_STATUS.ACTIVE,
    );

    return subscription;
  }

  async getById(id: string): Promise<Subscription> {
    const subscription = await this.subscriptionRepository.findById(id);

    if (!subscription) {
      throw new NOT_FOUND_EXCEPTION("Subscription not found");
    }

    return subscription;
  }

  async getByBusinessId(businessId: string): Promise<Subscription> {
    const subscription =
      await this.subscriptionRepository.findByBusinessId(businessId);

    if (!subscription) {
      throw new NOT_FOUND_EXCEPTION("Subscription not found");
    }

    const trialEnded =
      subscription?.status === SUBSCRIPTION_STATUS.TRIALING &&
      subscription.trial_ends_at &&
      new Date(subscription.trial_ends_at) <= new Date();

    if (trialEnded) {
      const updatedSubscription =
        await this.subscriptionRepository.updateStatus(
          subscription.id,
          SUBSCRIPTION_STATUS.EXPIRED,
        );
      await this.businessRepository.updateBusinessStatus(
        businessId,
        BUSINESS_STATUS.PENDING,
      );

      if (updatedSubscription) {
        return updatedSubscription;
      }
    }

    return subscription;
  }

  async updateStatus(
    id: string,
    data: UpdateSubscriptionDTO,
  ): Promise<Subscription> {
    const subscription = await this.subscriptionRepository.findById(id);

    if (!subscription) {
      throw new NOT_FOUND_EXCEPTION("Subscription not found");
    }

    const updatedSubscription = await this.subscriptionRepository.updateStatus(
      id,
      data.status as SUBSCRIPTION_STATUS,
    );

    if (!updatedSubscription) {
      throw new BAD_REQUST_EXCEPTION("Failed to update subscription");
    }

    return updatedSubscription;
  }
}
