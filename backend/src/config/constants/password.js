import bcrypt from "bcryptjs";
import { SALT_ROUND } from "./constants.js";

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, SALT_ROUND);
};

export const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
