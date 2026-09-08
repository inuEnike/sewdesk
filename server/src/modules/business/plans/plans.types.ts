import type postgres from "postgres";

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: string;
  created_at: string;
  updated_at: string;
}

export interface Repository {
  getAllPlans: () => Promise<Plan | null>;
  getPlanById: (id: string) => Promise<Plan | null>;
}
