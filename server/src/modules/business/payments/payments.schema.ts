import z from "zod";
import { PAYMENT_STATUS } from "./payments.types";
import { partial } from "zod/mini";
import { planSchema } from "../plans/plans.schema";

export const PaymentSchema = z.object({
  status: z.enum(PAYMENT_STATUS).default(PAYMENT_STATUS.PENDING).optional(),
  subscription_id: z.string({
    error: (issue) => {
      if (issue === undefined) {
        return "Subscription ID is required";
      }

      return "Subscription ID must be a string";
    },
  }),
  amount: z
    .number({
      error: (issue) => {
        if (issue.input === undefined) {
          return "Plan price is required";
        }

        return "Plan price must be a number";
      },
    })
    .positive("Price must be greater than zero")
    .multipleOf(0.01, "Price must have at most two decimal places"),

  currency: z.string({
    error: (issue) => {
      if (issue.input === undefined) {
        return "Currency is required";
      }

      return "Currency must be a string";
    },
  }),
  payment_reference: z
    .string({
      error: (issue) => {
        if (issue.input === undefined) {
          return "Payment Reference is required";
        }

        return "Payment Reference must be a string";
      },
    })
    .optional(),
});
export const UpdatePaymentSchema = planSchema.partial();

export type PaymentDTO = z.infer<typeof PaymentSchema>;
export type UpdatePaymentDTO = z.infer<typeof UpdatePaymentSchema>;
