import { CONFLICT_EXCEPTION } from "../../../../middleware/error.middleware";
import type {
  Subscription,
  SUBSCRIPTION_STATUS,
  subscriptionRepository,
} from "./subscription.types";
import type {
  SubscriptionDTO,
  UpdateSubscriptionDTO,
} from "./subscrition.schema";

export class SubscriptionService {
  constructor(
    private readonly subscriptionRepository: subscriptionRepository,
  ) {}

  async create(data: SubscriptionDTO): Promise<Subscription | null> {
    const existingSubscription =
      await this.subscriptionRepository.findByBusinessId(data.business_id);

    // if (existingSubscription) {
    //   throw new CONFLICT_EXCEPTION(
    //     "Business already has an active or pending subscription",
    //   );
    // }

    const subscription = await this.subscriptionRepository.create(data);

    return subscription;
  }

  async getById(id: string): Promise<Subscription> {
    const subscription = await this.subscriptionRepository.findById(id);

    if (!subscription) {
      throw new Error("Subscription not found");
    }

    return subscription;
  }

  async getByBusinessId(businessId: string): Promise<Subscription> {
    const subscription =
      await this.subscriptionRepository.findByBusinessId(businessId);

    if (!subscription) {
      throw new Error("Subscription not found");
    }

    return subscription;
  }

  async updateStatus(
    id: string,
    data: UpdateSubscriptionDTO,
  ): Promise<Subscription> {
    const subscription = await this.subscriptionRepository.findById(id);

    if (!subscription) {
      throw new Error("Subscription not found");
    }

    const updatedSubscription = await this.subscriptionRepository.updateStatus(
      id,
      data.status as SUBSCRIPTION_STATUS,
    );

    if (!updatedSubscription) {
      throw new Error("Failed to update subscription");
    }

    return updatedSubscription;
  }
}
