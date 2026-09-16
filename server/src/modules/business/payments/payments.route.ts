import { Router } from "express";
import { PaymentController } from "./payments.controller";
import { PaymentService } from "./payments.service";
import { PaymentRepositoryImpl } from "./payments.repository";
import { sql } from "../../../../config/db";
import { SubscriptionRepositoryImpl } from "../subscription/subscription.repository";
import { BusinessRepository } from "../core/business.repository";
import { PaystackService } from "./paystack/paystack.service";
import { ENV } from "../../../../utils/env.util";
import { authMiddleware } from "../../../../middleware/auth.middleware";

const route = Router();

const repository = new PaymentRepositoryImpl(sql);
const subscriptionRepository = new SubscriptionRepositoryImpl(sql);
const businessRepository = new BusinessRepository(sql);
const paystackService = new PaystackService(ENV.PAYSTACK_SECRET_KEY);
const service = new PaymentService(
  repository,
  subscriptionRepository,
  businessRepository,
  paystackService,
);
const controller = new PaymentController(service);

route
  .post("/initialize", authMiddleware, controller.create)
  .post("/verify", controller.verifyWebhook);

export default route;
