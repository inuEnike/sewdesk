import type { Request, Response, NextFunction } from "express";

import { planSchema, updatePlanSchema } from "./plans.schema";

import type { Service } from "./plans.types";

import { apiResponse } from "../../../../utils/apiResponse";
import { VALIDATION_EXCEPTION } from "../../../../middleware/error.middleware";

export class PlanController {
  constructor(private readonly planService: Service) {}

  // GET /plans
  getAllPlans = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const plans = await this.planService.getAllPlans();

      return apiResponse({
        req,
        res,
        message: `${plans?.length} plans retrieved successfully`,
        status: 200,
        data: plans,
      });
    } catch (error) {
      next(error);
    }
  };

  // GET /plans/:id
  getPlanById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const plan = await this.planService.getPlanById(id as string);

      return apiResponse({
        req,
        res,
        message: "Plan retrieved successfully",
        status: 200,
        data: plan,
      });
    } catch (error) {
      next(error);
    }
  };

  // POST /plans
  createPlan = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = planSchema.safeParse(req.body);

      if (!data.success) {
        throw new VALIDATION_EXCEPTION(data?.error?.issues[0]?.message);
      }
      const plan = await this.planService.createPlan(data.data);

      return apiResponse({
        req,
        res,
        message: "Plan created successfully",
        status: 201,
        data: plan,
      });
    } catch (error) {
      next(error);
    }
  };

  // PATCH /plans/:id
  updatePlanById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const data = updatePlanSchema.safeParse(req.body);

      if (!data.success) {
        throw new VALIDATION_EXCEPTION(data?.error?.issues[0]?.message);
      }

      const plan = await this.planService.updatePlanById(
        id as string,
        data.data,
      );

      return apiResponse({
        req,
        res,
        message: "Plan updated successfully",
        status: 200,
        data: plan,
      });
    } catch (error) {
      next(error);
    }
  };

  // DELETE /plans/:id
  deletePlanById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const plan = await this.planService.deletePlanById(id as string);

      return apiResponse({
        req,
        res,
        message: "Plan deleted successfully",
        status: 200,
        data: plan,
      });
    } catch (error) {
      next(error);
    }
  };
}
