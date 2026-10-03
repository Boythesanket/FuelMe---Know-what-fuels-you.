import * as userRepo from "../users/user.repository.js";
import ExpressError from "../../utils/ExpressError.js";
import { HTTP_STATUS } from "../../config/constants/httpStatus.js";
import {
  hashPassword,
  verifyPassword,
} from "../../config/constants/password.js";
import { generateAccessToken } from "../../config/constants/jwt.js";

export const register = async ({ fullName, email, password }) => {
  const existingUser = await userRepo.findUserByEmail(email);

  if (existingUser) {
    throw new ExpressError("Email already exists.", HTTP_STATUS.CONFLICT);
  }

  const hashedPassword = await hashPassword(password);

  const user = await userRepo.createUser({
    fullName,
    email,
    password: hashedPassword,
  });

  const accessToken = generateAccessToken(user);

  const { password: _, ...safeUser } = user;

  return {
    user: safeUser,
    accessToken,
  };
};

export const login = async ({ email, password }) => {
  const user = await userRepo.findUserByEmail(email);

  if (!user) {
    throw new ExpressError(
      "Invalid email or password.",
      HTTP_STATUS.UNAUTHORIZED,
    );
  }

  const isValid = await verifyPassword(password, user.password);

  if (!isValid) {
    throw new ExpressError(
      "Invalid email or password.",
      HTTP_STATUS.UNAUTHORIZED,
    );
  }

  const { password: _, ...safeUser } = user;

  return {
    user: safeUser,
  };
};
