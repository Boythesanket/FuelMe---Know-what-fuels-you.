import bcrypt from "bcryptjs";
import {SALT_ROUNDS} from "../constants/constants.js";

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

export const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
