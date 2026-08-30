import nodemailer from "nodemailer";
import { ENV } from "../utils/env.util";
import { logger } from "./logger";
import { ErrorLogger } from "./errorLog";

export const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: ENV.MAILER_NAME, // yourname@gmail.com
    pass: ENV.MAILER_PASSWORD, // Gmail App Password
  },
});

export const verifyNodemailer = async () => {
  try {
    await transport.verify();
    logger.info("Nodemailer ready to receive email");
  } catch (error) {
    ErrorLogger(error, "Failed to connect to Nodemailer");
  }
};
