import * as z from "zod";
export const SignupSchema = z
  .object({
    full_name: z.string(),
    email: z.email().toLowerCase(),
    phone_number: z.string(),
    hashed_password: z.string().min(7),
    repeat_password: z.string(),
  })
  .superRefine(({ hashed_password, repeat_password }, ctx) => {
    if (hashed_password != repeat_password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords does not match",
        path: ["repeat_password"],
      });
    }
  });

export type SignupDTO = z.infer<typeof SignupSchema>;

// verify logic
export const verifySchema = z.object({
  email: z.email(),
  token: z.string(),
});

export type verifyDTO = z.infer<typeof verifySchema>;

// Signin logic
export const SigninSchema = z.object({
  email: z.email(),
  password: z.string().min(7),
});

export type SigninDTO = z.infer<typeof SigninSchema>;
