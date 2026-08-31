import { Router } from "express";
import { BusinessController } from "./business.controller";
import { BusinessService } from "./business.service";
import { BusinessRepository } from "./business.repository";
import { sql } from "../../../../config/db";
import { authMiddleware } from "../../../../middleware/auth.middleware";

const router = Router();

const repository = new BusinessRepository(sql);
const service = new BusinessService(repository);
const controller = new BusinessController(service);

router
  .get("/me", authMiddleware, controller.getLoggedInUserBusinesses)
  .post("/", authMiddleware, controller.createBusiness)
  .get("/:slug", controller.getBusinessBySlug)
  .get("/me/:id", authMiddleware, controller.getLoggedInUserBusiness)
  .patch("/me/:id", controller.updateBusiness);

export default router;
