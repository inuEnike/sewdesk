import type { Request, Response } from "express";

interface ApiResponse<T> {
  res: Response;
  req: Request;
  message: string;
  status: number;
  data?: T;
}

export const apiResponse = <T>({
  res,
  message,
  req,
  status,
  data,
}: ApiResponse<T>) => {
  res.status(status).json({
    message,
    status,
    path: req?.originalUrl,
    req: req?.method,
    data,
  });
};
