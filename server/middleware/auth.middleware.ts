import type { NextFunction, Request, Response } from "express";
import { UNAUTHORIZED_EXCEPTION } from "./error.middleware";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { userId } = req.session;

  if (!userId) {
    throw new UNAUTHORIZED_EXCEPTION("Unauthorized, You must be logged in");
  }

  next();
};
