import type postgres from "postgres";
import type { PlansDTO, UpdatePlanDTO } from "./plans.schema";

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: string;
  created_at: string;
  updated_at: string;
}

export interface Repository {
  getAllPlans: () => Promise<Plan[] | null>;

  getPlanById: (id: string) => Promise<Plan | null>;

  createPlan: (data: PlansDTO) => Promise<Plan | null>;

  updatePlanById: (id: string, data: PlansDTO) => Promise<Plan | null>;

  deletePlanById: (id: string) => Promise<Plan | null>;
}

export interface Service {
  getAllPlans: () => Promise<Plan[] | null>;

  getPlanById: (id: string) => Promise<Plan | null>;

  createPlan: (data: PlansDTO) => Promise<Plan | null>;

  updatePlanById: (id: string, data: UpdatePlanDTO) => Promise<Plan | null>;

  deletePlanById: (id: string) => Promise<Plan | null>;
}
