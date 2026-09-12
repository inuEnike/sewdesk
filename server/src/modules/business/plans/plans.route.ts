import { Router } from "express";

import { PlanController } from "./plans.controller";
import { PlanService } from "./plans.service";
import { PlanRepository } from "./plans.repository";
import { sql } from "../../../../config/db";

const router = Router();

const planRepository = new PlanRepository(sql);
const planService = new PlanService(planRepository);
const planController = new PlanController(planService);

router
  .get("/", planController.getAllPlans)
  .get("/:id", planController.getPlanById)
  .post("/", planController.createPlan)
  .patch("/:id", planController.updatePlanById)
  .delete("/:id", planController.deletePlanById);

export default router;
