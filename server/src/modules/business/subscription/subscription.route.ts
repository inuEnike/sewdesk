import { Router } from "express";

import { SubscriptionController } from "./subscription.controller";

import { SubscriptionService } from "./subcription.service";

import { SubscriptionRepositoryImpl } from "./subscription.repository";

import { sql } from "../../../../config/db";
import { authMiddleware } from "../../../../middleware/auth.middleware";

const router = Router();

const repository = new SubscriptionRepositoryImpl(sql);

const service = new SubscriptionService(repository);

const controller = new SubscriptionController(service);

router
  .post("/", authMiddleware, controller.create)
  .get("/business/:businessId", authMiddleware, controller.getByBusinessId)
  .get("/:id", controller.getById)
  .patch("/:id", controller.updateStatus);

export default router;
