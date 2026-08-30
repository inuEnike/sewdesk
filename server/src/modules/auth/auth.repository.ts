import type { Sql } from "postgres";
import type {
  CreateUserData,
  Repository,
  User,
  UserWithoutPassword,
} from "./auth.types";
import { ErrorLogger } from "../../../config/errorLog";

export class AuthRepository implements Repository {
  private readonly sql: Sql;
  constructor(sql: Sql) {
    this.sql = sql;
  }

  findUserByEmail = async (email: string): Promise<User | null> => {
    const [user] = await this.sql<User[]>`
            SELECT * 
            FROM auth.users 
            WHERE email=${email}
            LIMIT 1
        `;
    return user ?? null;
  };

  createUser = async (data: CreateUserData): Promise<User | null> => {
    const [user] = await this.sql<User[]>`
    INSERT INTO auth.users
    (
      full_name, 
      email, 
      phone_number, 
      hashed_password
    )
    VALUES (
      ${data.full_name}, 
      ${data.email}, 
      ${data.phone_number}, 
      ${data.hashed_password}
    )
    RETURNING *
  `;

    return user ?? null;
  };

  updateUserVerificationStatus = async (
    email: string,
  ): Promise<User | null> => {
    try {
      const [user] = await this.sql<User[]>`
        UPDATE auth.users
        SET is_verified = true
        WHERE email = ${email}
        RETURNING *
    `;

      return user ?? null;
    } catch (error) {
      ErrorLogger(error);
      throw Error;
    }
  };

  getUserById = async (id: string): Promise<UserWithoutPassword | null> => {
    const [user] = await this.sql<UserWithoutPassword[]>`
        SELECT id, full_name, email, phone_number, is_verified, status, created_at, updated_at 
        FROM auth.users 
        WHERE id = ${id}    
        `;
    return user ?? null;
  };
}
