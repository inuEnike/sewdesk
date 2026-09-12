import z from "zod";

export const planSchema = z.object({
  name: z
    .string({
      error: (issue) => {
        if (issue.input === undefined) {
          return "Plan name is required";
        }

        return "Plan name must be a string";
      },
    })
    .trim()
    .min(1, "Plan name cannot be empty"),

  description: z
    .string({
      error: (issue) => {
        if (issue.input === undefined) {
          return "Plan description is required";
        }

        return "Plan description must be a string";
      },
    })
    .trim()
    .min(1, "Plan description cannot be empty"),

  price: z
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
});

export type PlansDTO = z.infer<typeof planSchema>;
export const updatePlanSchema = planSchema.partial();

export type UpdatePlanDTO = z.infer<typeof updatePlanSchema>;