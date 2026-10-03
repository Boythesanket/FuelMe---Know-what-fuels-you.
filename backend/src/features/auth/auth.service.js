import * as userRepo from "../users/user.repository.js";
import ExpressError from "../../utils/ExpressError.js";
import { HTTP_STATUS } from "../../config/constants/httpStatus.js";

export const register = async ({ fullName, email, password }) => {
  const existingUser = await userRepo.findUserByEmail(email);

  if (existingUser) {
    throw new ExpressError("Email already exists.", HTTP_STATUS.CONFLICT);
  }

  const user = await userRepo.createUser({ fullName, email, password });

  const { password: _, ...safeUser } = user;

  return {
    user: safeUser,
  };
};
