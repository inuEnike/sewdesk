import { redis } from "../../../config/redis";
import { EmailService } from "../../../emails/email.service";
import {
  BAD_REQUST_EXCEPTION,
  CONFLICT_EXCEPTION,
  NOT_FOUND_EXCEPTION,
  UNAUTHORIZED_EXCEPTION,
} from "../../../middleware/error.middleware";
import { ENV } from "../../../utils/env.util";
import {
  compareToken,
  generateToken,
  hashAlgorithm,
} from "../../../utils/hashAlgorithm";
import { type SigninDTO, type SignupDTO, type verifyDTO } from "./auth.schema";
import type {
  Repository,
  Service,
  User,
  UserWithoutPassword,
} from "./auth.types";

export class AuthService implements Service {
  constructor(private readonly repository: Repository) {}

  signup = async (data: SignupDTO): Promise<{ message: string }> => {
    // check for temp email

    const exixtingUser: User | null = await this.repository.findUserByEmail(
      data.email,
    );

    // checks for existing user
    if (exixtingUser) {
      throw new CONFLICT_EXCEPTION("Email already exists, please signin");
    }

    // hash password
    const hashedPassword = await hashAlgorithm(data.hashed_password);

    // generate otp
    const token = generateToken();

    // hash the Token
    const hashToken = await hashAlgorithm(token);

    // save the hashed Token in redis
    await redis.set(`verify:${data.email}`, hashToken, {
      expiration: {
        type: "EX",
        value: 60 * 5,
      },
    });

    // create user
    await this.repository.createUser({
      ...data,
      hashed_password: hashedPassword,
    });

    // Verification Link
    const verification_link = `https://${ENV.CLIENT_URL}/verify-email?token=${token}&email=${encodeURIComponent(data.email)}`;

    // send Token
    await EmailService.verificationEmail(data.email, verification_link);

    return {
      message: `Account created successfully. Please verify your email. ${token}`,
    };
  };

  verifyEmail = async (data: verifyDTO) => {
    // get the hashed token stored in redis
    const hashedToken = await redis.get(`verify:${data.email}`);

    if (!hashedToken) {
      throw new BAD_REQUST_EXCEPTION("Verification token expired or invalid");
    }

    // compare the gotten token from redis cache with the the token from the client
    const compareBothTokens = await compareToken(hashedToken, data.token);

    // validate any error
    if (!compareBothTokens) {
      throw new BAD_REQUST_EXCEPTION("Verification token expired or invalid");
    }

    // update database field (is_verified)
    await this.repository.updateUserVerificationStatus(data.email);

    // destroy the token from redis cache
    await redis.del(`verify:${data.email}`);

    return {
      message: "User successfully verified, you can now signin",
    };
  };

  signin = async (data: SigninDTO) => {
    // check if user exists
    const User = await this.repository.findUserByEmail(data.email);

    // check if user is verified
    const verifyUser = User?.is_verified;

    if (!verifyUser) {
      throw new CONFLICT_EXCEPTION("Verify your account before signin");
    }

    //compare the passwords
    const comparePasswords = await compareToken(
      User.hashed_password,
      data.password,
    );

    if (!comparePasswords) {
      throw new UNAUTHORIZED_EXCEPTION("Invalid signin credentials");
    }
    // send signin message
    return User;
  };

  me = async (id: string): Promise<UserWithoutPassword> => {
    const getMe = await this.repository.getUserById(id);

    if (!getMe) {
      throw new NOT_FOUND_EXCEPTION("User not found");
    }
    return getMe;
  };
}
