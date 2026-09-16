import nodemailer from "nodemailer";
import { Resend } from "resend";

import { ENV } from "../utils/env.util";
import { logger } from "./logger";
import { ErrorLogger } from "./errorLog";

export const transport =
  ENV.NODE_ENV !== "production"
    ? nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: ENV.MAILER_NAME,
          pass: ENV.MAILER_PASSWORD,
        },
      })
    : null;

export const resend =
  ENV.NODE_ENV === "production" ? new Resend(ENV.MAILER_PASSWORD) : null;

export const verifyNodemailer = async () => {
  if (!transport) return;

  try {
    await transport.verify();

    logger.info("Nodemailer ready to send email 📧");
  } catch (error) {
    ErrorLogger(error, "Failed to connect to Nodemailer");
  }
};

export const verifyResend = async () => {
  if (!resend) return;

  try {
    if (!ENV.MAILER_PASSWORD) {
      throw new Error("RESEND_API_KEY is missing");
    }

    logger.info("Resend configured successfully 🚀");
  } catch (error) {
    ErrorLogger(error, "Failed to configure Resend");
  }
};
