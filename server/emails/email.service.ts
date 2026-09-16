import { resend, transport } from "../config/emailCLient";
import { ENV } from "../utils/env.util";
import { verificationEmail } from "./templates/verification";

export class EmailService {
  static async verificationEmail(email: string, verificationLink: string) {
    await resend.emails.send({
      from: `"Sewdesk Team" <${ENV.SENDER_EMAIL}>`,
      to: `${email}`,
      subject: `Welcome to SewDesk — Verify your email`,
      text: `Welcome to SewDesk!

            Thanks for creating your SewDesk account.

            Please verify your email address by clicking the link below:

            ${verificationLink}

            This verification link will expire in 5 minutes.

            If you didn't create a SewDesk account, you can safely ignore this email.

            © SewDesk. All rights reserved.
        `,
      html: verificationEmail(verificationLink),
    });
  }
}
