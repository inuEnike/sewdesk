import { api } from "@/lib/api";
import { CreateSubscriptionDto } from "./subscription.type";

export class SubscriptionService {
  static async create(data: CreateSubscriptionDto) {
    const subscription = await api.post("/subscription", data);

    if (subscription.status != 201) {
      throw new Error(subscription?.data?.error);
    }
    return subscription.data;
  }
  static async getByBusinessId(id: string) {
    const subscription = await api.get(`/subscription/business/${id}`);

    if (subscription.status != 200) {
      throw new Error(subscription?.data?.error);
    }
    return subscription.data;
  }
}
