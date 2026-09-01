import z from "zod";

export const planSchema = z.object({
  name: z.string({
    error: (issue) => {
      if (issue.input === undefined) {
        return "Plan name is required";
      }
    },
  }),
  description: z.string({
    error: (issue) => {
      if (issue.input === undefined) {
        return "Plan description is required";
      }
    },
  }),

  price: z
    .number()
    .positive("Price must be greater than zero")
    .multipleOf(0.01, "Price must have at most two decimal places"),
});

export type PlansDTO = z.infer<typeof planSchema>;
