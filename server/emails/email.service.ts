import { resend, transport } from "../config/emailCLient";

import { ENV } from "../utils/env.util";

import { verificationEmail } from "./templates/verification";

export class EmailService {
  static async verificationEmail(email: string, verificationLink: string) {
    const subject = "Welcome to SewDesk — Verify your email";

    const text = `Welcome to SewDesk!

Thanks for creating your SewDesk account.

Please verify your email address by clicking the link below:

${verificationLink}

This verification link will expire in 5 minutes.

If you didn't create a SewDesk account, you can safely ignore this email.

© SewDesk. All rights reserved.
`;

    const html = verificationEmail(verificationLink);

    if (ENV.NODE_ENV === "production") {
      if (!resend) {
        throw new Error("Resend is not configured");
      }

      const { data, error } = await resend.emails.send({
        from: `"Sewdesk Team" <${ENV.SENDER_EMAIL}>`,
        to: email,
        subject,
        text,
        html,
      });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    }

    if (!transport) {
      throw new Error("Nodemailer is not configured");
    }

    return await transport.sendMail({
      from: `"Sewdesk Team" <${ENV.SENDER_EMAIL}>`,
      to: email,
      subject,
      text,
      html,
    });
  }
}
