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
    .nonnegative("Price cannot be negative")
    .multipleOf(0.01, "Price must have at most two decimal places"),

  period: z
    .string({
      error: (issue) => {
        if (issue.input === undefined) {
          return "Plan period is required";
        }

        return "Plan period must be a string";
      },
    })
    .trim()
    .min(1, "Plan period cannot be empty"),

  cta: z
    .string({
      error: (issue) => {
        if (issue.input === undefined) {
          return "Plan CTA is required";
        }

        return "Plan CTA must be a string";
      },
    })
    .trim()
    .min(1, "Plan CTA cannot be empty"),

  highlight: z.boolean().default(false),

  badge: z.string().trim().nullable().optional(),

  features: z
    .array(z.string().trim().min(1, "Feature cannot be empty"))
    .default([]),
});

export type PlansDTO = z.infer<typeof planSchema>;

export const updatePlanSchema = planSchema.partial();

export type UpdatePlanDTO = z.infer<typeof updatePlanSchema>;
