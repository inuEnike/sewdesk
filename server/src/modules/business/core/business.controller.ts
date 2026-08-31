import type { NextFunction, Request, Response } from "express";
import type { Business, Service } from "./business.types";
import {
  FORBIDDEN_EXCEPTION,
  NOT_FOUND_EXCEPTION,
  UNAUTHORIZED_EXCEPTION,
  VALIDATION_EXCEPTION,
} from "../../../../middleware/error.middleware";
import { apiResponse } from "../../../../utils/apiResponse";
import { BusinessSchema, type businessDTO } from "./business.schema";
import { logger } from "../../../../config/logger";

export class BusinessController {
  private readonly service: Service;
  constructor(service: Service) {
    this.service = service;
  }

  getLoggedInUserBusinesses = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      // get the user id from session
      const { userId } = req.session;

      // ceck if the user id exists
      if (!userId) {
        throw new UNAUTHORIZED_EXCEPTION("Please login first");
      }

      // get the businesses
      const businesses = await this.service.getLoggedInUserBusinesses(userId);
      apiResponse({
        req,
        res,
        message:
          businesses.length && businesses.length === 1
            ? `${businesses.length} business found `
            : `${businesses.length} businesss found `,
        status: 200,
        data: businesses,
      });
    } catch (error) {
      next(error);
    }
  };

  createBusiness = async (req: Request, res: Response, next: NextFunction) => {
    // get logged in user id
    const { userId } = req.session;
    // check if the user id exists
    if (!userId) {
      throw new UNAUTHORIZED_EXCEPTION("Please login first");
    }

    // zod validation
    const result = BusinessSchema.safeParse(req.body);

    if (!result.success) {
      throw new VALIDATION_EXCEPTION(result?.error?.issues[0]?.message);
    }

    // create the business
    const user = await this.service.createBusiness(result.data, userId);

    apiResponse({
      req,
      res,
      message: "Business created successfully",
      status: 201,
      data: user,
    });
  };

  getLoggedInUserBusiness = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { id } = req.params;

    if (!id) {
      throw new NOT_FOUND_EXCEPTION("Id not found ");
    }
    const { userId } = req.session;

    // check if the user id exists
    if (!userId) {
      throw new UNAUTHORIZED_EXCEPTION("Please login first");
    }

    const business = await this.service.getLoggedInUserBusiness(
      id as string,
      userId,
    );
    apiResponse({
      req,
      res,
      message: "Business found",
      status: 200,
      data: business,
    });
  };

  getBusinessBySlug = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { slug } = req.params;

      const business = await this.service.getBusinessBySlug(slug as string);

      apiResponse({
        req,
        res,
        message: "Business found",
        status: 200,
        data: business,
      });
    } catch (error) {
      next(error);
    }
  };

  updateBusiness = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.session;

      // check if the user id exists
      if (!userId) {
        throw new UNAUTHORIZED_EXCEPTION("You are not logged in, please login");
      }

      const { id } = req.params;

      const business = await this.service.updateBusiness(
        id as string,
        userId,
        req.body,
      );

      apiResponse({
        req,
        res,
        message: "Business Updated successfully",
        status: 201,
        data: business,
      });
    } catch (error) {
      next(error);
    }
  };
}
