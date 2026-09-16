import type { Request, Response, NextFunction } from "express";

import { apiResponse } from "../../../../utils/apiResponse";
import {
  subscriptionSchema,
  updateSubscriptionSchema,
} from "./subscrition.schema";
import type { SubscriptionService } from "./subcription.service";
import { VALIDATION_EXCEPTION } from "../../../../middleware/error.middleware";

export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  // POST /subscriptions
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = subscriptionSchema.safeParse(req.body);

      if (!data.success) {
        throw new VALIDATION_EXCEPTION(data?.error?.issues[0]?.message);
      }

      const subscription = await this.subscriptionService.create(data.data);

      return apiResponse({
        req,
        res,
        message: "Subscription created successfully",
        status: 201,
        data: subscription,
      });
    } catch (error) {
      next(error);
    }
  };

  // GET /subscriptions/:id
  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const subscription = await this.subscriptionService.getById(id as string);

      return apiResponse({
        req,
        res,
        message: `Subscription found`,
        status: 200,
        data: subscription,
      });
    } catch (error) {
      next(error);
    }
  };

  // GET /subscriptions/business/:businessId
  getByBusinessId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { businessId } = req.params;

      const subscription = await this.subscriptionService.getByBusinessId(
        businessId as string,
      );

      return apiResponse({
        req,
        res,
        message: "Subscription found successfully",
        status: 200,
        data: subscription,
      });
    } catch (error) {
      next(error);
    }
  };

  // PATCH /subscriptions/:id
  updateStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const data = updateSubscriptionSchema.safeParse(req.body);

      if (!data.success) {
        throw new VALIDATION_EXCEPTION(data?.error?.issues[0]?.message);
      }

      const subscription = await this.subscriptionService.updateStatus(
        id as string,
        data?.data,
      );

      return apiResponse({
        req,
        res,
        message: "Subscription updated successfully",
        status: 200,
        data: subscription,
      });
    } catch (error) {
      next(error);
    }
  };
}
