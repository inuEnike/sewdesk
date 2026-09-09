import z from "zod";

export type User = {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
  is_verified: boolean;
  status: "active" | "inactive" | "suspended";
  created_at: string;
  updated_at: string;
};

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export const SignupSchema = z.object({
  full_name: z.string(),
  email: z.email(),
  phone_number: z.string(),
  hashed_password: z.string(),
  repeat_password: z.string(),
});

export type loginDTO = z.infer<typeof LoginSchema>;
export type signupDTO = z.infer<typeof SignupSchema>;
