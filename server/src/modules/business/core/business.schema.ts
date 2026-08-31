import z from "zod";
import { BUSINESS_STATUS } from "./business.types";

export const BusinessSchema = z.object({
  business_name: z
    .string({
      error: (issue) => {
        if (issue.input === undefined) {
          return "Business name is required";
        }
      },
    })
    .min(1),
  address: z
    .string({
      error: (issue) => {
        if (issue.input === undefined) {
          return "Business address is required";
        }
      },
    })
    .min(1),
  business_phone: z
    .string({
      error: (issue) => {
        if (issue.input === undefined) {
          return "Business phone number is required";
        }
      },
    })
    .min(1),
  whatsapp_number: z
    .string({
      error: (issue) => {
        if (issue.input === undefined) {
          return "Business whatsapp number is required";
        }
      },
    })
    .min(1),
  business_email: z
    .email({
      error: (issue) => {
        if (issue.input === undefined) {
          return "Business email is required";
        }
        return "Business email must be a valid email address";
      },
    })
    .toLowerCase(),
  slug: z
    .string({
      error: (issue) => {
        if (issue.input === undefined) {
          return "Business slug is required";
        }
      },
    })
    .min(3),
  status: z.enum(BUSINESS_STATUS),
  description: z.string().nullable(),
});

export type businessDTO = z.infer<typeof BusinessSchema>;
