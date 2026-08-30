import type { NextFunction, Request, Response } from "express";
import {
  BAD_REQUST_EXCEPTION,
  UNAUTHORIZED_EXCEPTION,
  VALIDATION_EXCEPTION,
} from "../../../middleware/error.middleware";
import { apiResponse } from "../../../utils/apiResponse";
import { SigninSchema, SignupSchema, verifySchema } from "./auth.schema";
import type { Service } from "./auth.types";

export class AuthController {
  constructor(private readonly service: Service) {}

  signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = SignupSchema.safeParse(req.body);

      if (!result.success) {
        throw new VALIDATION_EXCEPTION(
          result?.error?.issues[0]?.path + " is required",
        );
      }

      const user = await this.service.signup(result.data);
      apiResponse({
        req,
        res,
        message: user.message,
        status: 201,
      });
    } catch (error) {
      next(error);
    }
  };

  verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = verifySchema.safeParse(req.body);
      if (!result.success) {
        throw new VALIDATION_EXCEPTION(
          result?.error?.issues[0]?.path + " is required",
        );
      }

      const verify = await this.service.verifyEmail(result.data);

      apiResponse({
        req,
        res,
        message: verify.message,
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  };

  signin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = SigninSchema.safeParse(req.body);
      if (!result.success) {
        throw new VALIDATION_EXCEPTION(
          result?.error?.issues[0]?.path + " is required",
        );
      }
      const user = await this.service.signin(result.data);

      const session = (req.session.userId = user?.id);

      apiResponse({
        req,
        res,
        message: "Signin Success",
        status: 200,
        data: session,
      });
    } catch (error) {
      next(error);
    }
  };

  signout = async (req: Request, res: Response, next: NextFunction) => {
    req.session.destroy((err) => {
      if (err) {
        return next(new BAD_REQUST_EXCEPTION(err.message));
      }

    res.clearCookie("sewdesk.sid");

     


      return res.status(200).json({
        success: true,
        message: "Logged out successfully",
        status: 200,
      });
    });
  };

  me = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.session;
      if (!userId) {
        throw new UNAUTHORIZED_EXCEPTION("You must be logged in");
      }
      const me = await this.service.me(userId);

      apiResponse({
        req,
        res,
        message: "User found",
        status: 200,
        data: me,
      });
    } catch (error) {
      next(error);
    }
  };
}
