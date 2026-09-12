import { NOT_FOUND_EXCEPTION } from "../../../../middleware/error.middleware";
import {
  planSchema,
  updatePlanSchema,
  type PlansDTO,
  type UpdatePlanDTO,
} from "./plans.schema";
import type { Plan, Repository, Service } from "./plans.types";

export class PlanService implements Service {
  constructor(private readonly planRepository: Repository) {}

  getAllPlans = async (): Promise<Plan[] | null> => {
    return await this.planRepository.getAllPlans();
  };

  getPlanById = async (id: string): Promise<Plan | null> => {
    const plan = await this.planRepository.getPlanById(id);

    if (!plan) {
      throw new NOT_FOUND_EXCEPTION(`Plan with the id of ${id} was not found`);
    }

    return plan;
  };

  createPlan = async (data: PlansDTO): Promise<Plan | null> => {
    const validatedData = planSchema.parse(data);

    return await this.planRepository.createPlan(validatedData);
  };

  updatePlanById = async (
    id: string,
    data: UpdatePlanDTO,
  ): Promise<Plan | null> => {
    const validatedData = updatePlanSchema.parse(data);

    const existingPlan = await this.planRepository.getPlanById(id);

    if (!existingPlan) {
      throw new NOT_FOUND_EXCEPTION(`Plan with the id of ${id} was not found`);
    }

    const updatedData = {
      name: validatedData.name ?? existingPlan.name,
      description: validatedData.description ?? existingPlan.description,
      price: Number(validatedData.price) ?? existingPlan.price,
    };

    return await this.planRepository.updatePlanById(id, updatedData);
  };

  deletePlanById = async (id: string): Promise<Plan | null> => {
    const existingPlan = await this.planRepository.getPlanById(id);

    if (!existingPlan) {
      throw new Error(`Plan with the id of ${id} was not found`);
    }

    return await this.planRepository.deletePlanById(id);
  };
}
