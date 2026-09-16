import { api } from "@/lib/api";
import { CreateSubscriptionDto } from "./subscription.type";

export class SubscriptionService {
  static async create(data: CreateSubscriptionDto) {
    const plans = await api.post("/subscription", data);

    if (plans.status != 201) {
      throw new Error(plans?.data?.error);
    }
    return plans.data;
  }
  // static async ini
}
