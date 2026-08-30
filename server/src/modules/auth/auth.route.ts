import { Router } from "express";
import { AuthRepository } from "./auth.repository";
import { sql } from "../../../config/db";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import {
  SigninRateLimiter,
  SignupRateLimiter,
  VerifyEmailRateLimiter,
} from "../../../middleware/rate-limit.middleware";
import { authMiddleware } from "../../../middleware/auth.middleware";

const router = Router();

const repository = new AuthRepository(sql);
const service = new AuthService(repository);
const controller = new AuthController(service);
router
  .post("/signup", SignupRateLimiter, controller.signup)
  .post("/verify-email", VerifyEmailRateLimiter, controller.verifyEmail)
  .post("/signin", SigninRateLimiter, controller.signin)
  .post("/signout", controller.signout)
  .get("/me", authMiddleware, controller.me);

export default router;
