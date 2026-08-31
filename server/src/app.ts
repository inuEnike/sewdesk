import express, { type Express, type Request, type Response } from "express";
import session from "express-session";
import { ENV } from "../utils/env.util";
import { RedisStore } from "connect-redis";
import { redis } from "../config/redis";
import { apiResponse } from "../utils/apiResponse";
import { ErrorMiddleware } from "../middleware/error.middleware";
import authRouter from "./modules/auth/auth.route";
import businessRouter from "./modules/business/core/business.route";

export const app: Express = express();

app.use(express.json());
app.use(
  session({
    secret: ENV.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new RedisStore({
      client: redis,
      prefix: "sewdesk-session:",
    }),
    rolling: true,
    name: "sewdesk.sid",
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 30,
    },
  }),
);

const prefix = "/api/v1";

app.use(`${prefix}/auth`, authRouter);
app.use(`${prefix}/business`, businessRouter);

app.use((req: Request, res: Response) => {
  apiResponse({
    res,
    req,
    message: "Route not found",
    status: 404,
  });
});

app.use(ErrorMiddleware);
