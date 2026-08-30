import type { NextFunction, Request, Response } from "express";
import { apiResponse } from "../utils/apiResponse";
import { ZodError } from "zod";
import { ENV } from "../utils/env.util";

class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;

    Error.captureStackTrace?.(this, this.constructor);
  }
}

export const ErrorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      message: err.message,
      method: req.method,
      stack: ENV.NODE_ENV === "development" ? err.stack : undefined,
    });
  } else if (err instanceof ZodError) {
    res.status(400).json({
      message: err.message,
      method: req.method,
      stack: ENV.NODE_ENV === "development" ? err.stack : undefined,
      errors: err.issues,
    });
  }
};

export class NOT_FOUND_EXCEPTION extends AppError {
  constructor(message = "RESOURCE NOT FOUND") {
    super(message, 404);
  }
}

export class VALIDATION_EXCEPTION extends AppError {
  constructor(message = "VALIDATION FAILED, please check all the inputs") {
    super(message, 400);
  }
}

export class CONFLICT_EXCEPTION extends AppError {
  constructor(message = "Resource already exists") {
    super(message, 400);
  }
}

export class BAD_REQUST_EXCEPTION extends AppError {
  constructor(message = "Bad request") {
    super(message, 400);
  }
}

export class FORBIDDEN_EXCEPTION extends AppError {
  constructor(message = "You are not allowed here") {
    super(message, 403);
  }
}

export class UNAUTHORIZED_EXCEPTION extends AppError {
  constructor(message = "Invalid Credentials") {
    super(message, 401);
  }
}
