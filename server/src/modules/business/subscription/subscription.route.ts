import { Router } from "express";

import { SubscriptionController } from "./subscription.controller";

import { SubscriptionService } from "./subcription.service";

import { SubscriptionRepositoryImpl } from "./subscription.repository";

import { sql } from "../../../../config/db";
import { authMiddleware } from "../../../../middleware/auth.middleware";
import { BusinessRepository } from "../core/business.repository";

const router = Router();

const repository = new SubscriptionRepositoryImpl(sql);
const businessRepository = new BusinessRepository(sql);

const service = new SubscriptionService(repository, businessRepository);

const controller = new SubscriptionController(service);

router
  .post("/", authMiddleware, controller.create)
  .get("/business/:businessId", authMiddleware, controller.getByBusinessId)
  .get("/:id", authMiddleware, controller.getById)
  .patch("/:id", controller.updateStatus);

export default router;
