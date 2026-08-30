import type { SigninDTO, SignupDTO, verifyDTO } from "./auth.schema";

enum USER_STATUS {
  ACTIVE = "active",
  WARNING = "warning",
  SUSPENDED = "suspended",
}
export interface User {
  id: string;
  full_name: string;
  email: string;
  is_verified: boolean;
  phone_number: string;
  hashed_password: string;
  status: USER_STATUS;
  created_at: string;
  updated_at: string;
}

export type UserWithoutPassword = Omit<User, "hashed_password">;

export interface CreateUserData {
  full_name: string;
  email: string;
  phone_number: string;
  hashed_password: string;
}

export interface Repository {
  findUserByEmail: (email: string) => Promise<User | null>;
  createUser: (data: CreateUserData) => Promise<User | null>;
  updateUserVerificationStatus: (email: string) => Promise<User | null>;
  getUserById: (id: string) => Promise<Omit<User, "hashed_password"> | null>;
}

export interface Service {
  signup: (data: SignupDTO) => Promise<{ message: string }>;
  verifyEmail: (data: verifyDTO) => Promise<{ message: string }>;
  signin: (data: SigninDTO) => Promise<User | null>;
  me: (id: string) => Promise<UserWithoutPassword | null>;
}
