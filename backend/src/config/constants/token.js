import bcrypt from "bcryptjs";
import crypto from "crypto";

export const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

export const verifyToken = async (token, hash) => {
  return bcrypt.compare(token, hash);
};
