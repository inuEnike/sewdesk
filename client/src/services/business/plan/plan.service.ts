import { api } from "@/lib/api";

export class PlanService {
  static async getAllPlans() {
    const plans = await api.get("/plans");
    return plans.data;
  }
  // static async ini
}
