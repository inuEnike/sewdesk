import type { Request, Response, NextFunction } from "express";

import type { PaymentService } from "./payments.service";

import { PaymentSchema } from "./payments.schema";
import { apiResponse } from "../../../../utils/apiResponse";
import crypto from "crypto";
import { UNAUTHORIZED_EXCEPTION } from "../../../../middleware/error.middleware";
import { ENV } from "../../../../utils/env.util";

export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // POST /payments

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = PaymentSchema.parse(req.body);
      const { userId } = req.session;

      if (!userId) {
        throw new UNAUTHORIZED_EXCEPTION("You must be logged in first");
      }


      const payment = await this.paymentService.create(data, userId);


      return apiResponse({
        req,
        res,
        message: "Payment created successfully",
        status: 201,
        data: payment,
      });
    } catch (error) {
      next(error);
    }
  };

  // GET /payments/:id

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const payment = await this.paymentService.getById(id as string);

      return apiResponse({
        req,
        res,
        message: "Payment found successfully",
        status: 200,
        data: payment,
      });
    } catch (error) {
      next(error);
    }
  };

  // GET /payments/reference/:reference

  getByReference = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { reference } = req.params;

      const payment = await this.paymentService.getByReference(
        reference as string,
      );

      return apiResponse({
        req,
        res,
        message: "Payment found successfully",
        status: 200,
        data: payment,
      });
    } catch (error) {
      next(error);
    }
  };

  // GET /payments/business/:businessId

  getByBusinessId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { businessId } = req.params;

      const payments = await this.paymentService.getByBusinessId(
        businessId as string,
      );

      return apiResponse({
        req,
        res,
        message:
          payments.length === 1
            ? `${payments.length} payment found`
            : `${payments.length} payments found`,
        status: 200,
        data: payments,
      });
    } catch (error) {
      next(error);
    }
  };

  verifyWebhook = async (req: Request, res: Response, next: NextFunction) => {
    try {

      if (!req.rawBody) {
        throw new Error("Raw request body is missing");
      }


      const hash = crypto
        .createHmac("sha512", ENV.PAYSTACK_SECRET_KEY)
        .update(req.rawBody)
        .digest("hex");



      if (hash !== req.headers["x-paystack-signature"]) {
        throw new UNAUTHORIZED_EXCEPTION("Invalid Paystack signature");
      }

      const event = req.body;

      const subscription = await this.paymentService.verifyWebhook(
        event?.payment_reference,
      );

      return apiResponse({
        req,
        res,
        message: "Webhook received successfully",
        status: 200,
        data: subscription,
      });
    } catch (error) {
      next(error);
    }
  };
}
