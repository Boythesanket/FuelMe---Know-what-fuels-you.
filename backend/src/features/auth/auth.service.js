import * as userRepo from "../users/user.repository.js";
import ExpressError from "../../utils/ExpressError.js";
import { HTTP_STATUS } from "../../config/constants/httpStatus.js";
import {
  hashPassword,
  verifyPassword,
} from "../../config/constants/password.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../config/constants/jwt.js";
import * as sessionRepo from "../session/session.repo.js";
import { hashToken } from "../../config/constants/token.js";

// user register service
export const register = async ({ fullName, email, password, sessionInfo }) => {
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

  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  const session = await sessionRepo.createSession({
    userId: user.id,
    ...sessionInfo,
    expiresAt,
  });

  // accessToken to keep the session active for 15 minutes only.
  const accessToken = generateAccessToken(user);
  
  // refreshToken to keep the session active for 30 days.
  const refreshToken = generateRefreshToken(user, session);

  const hashedRefreshToken = hashToken(refreshToken);

  await sessionRepo.updateSession(session.id, {
    refreshToken: hashedRefreshToken,
  });

  const { password: _, ...safeUser } = user;

  return {
    user: safeUser,
    accessToken,
    refreshToken,
  };
};

// user login service
export const login = async ({ email, password, sessionInfo }) => {
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

  const expiresAt = new Date(Date.now(+30 * 24 * 60 * 60 * 1000));

  const session = await sessionRepo.createSession({
    userId: user.id,
    ...sessionInfo,
    expiresAt,
  });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, session);

  const hashedRefreshToken = hashToken(refreshToken);

  await sessionRepo.updateSession(session.id, {
    refreshToken: hashedRefreshToken,
  });

  const { password: _, ...safeUser } = user;

  return {
    user: safeUser,
    accessToken,
    refreshToken,
  };
};

// if access token is expired then we generate new access and refresh token.
export const refreshToken = async (refreshTokenFromCookie) => {
  if (!refreshTokenFromCookie) {
    throw new ExpressError("Refresh token missing.", HTTP_STATUS.UNAUTHORIZED);
  }

  let payload;

  try {
    payload = verifyRefreshToken(refreshTokenFromCookie);
  } catch (error) {
    throw new ExpressError("Invalid refresh token", HTTP_STATUS.UNAUTHORIZED);
  }

  const session = await sessionRepo.findSessionById(payload.sid);

  if (!session.userId !== payload.sud) {
    throw new ExpressError("Invalid session", HTTP_STATUS.UNAUTHORIZED);
  }

  if (session.isRevoked) {
    throw new ExpressError("Session revoked", HTTP_STATUS.UNAUTHORIZED);
  }

  if (session.expiresAt < new Date()) {
    throw new ExpressError("Session expired", HTTP_STATUS.UNAUTHORIZED);
  }

  const isValid = await verifyToken(
    refreshTokenFromCookie,
    session.refreshTokenHash,
  );

  if (!isValid) {
    throw new ExpressError("Invalid refresh token", HTTP_STATUS.UNAUTHORIZED);
  }

  const user = await userRepo.findUserById(payload.sub);

  if (!user) {
    throw new ExpressError("User not found", HTTP_STATUS.UNAUTHORIZED);
  }

  const accessToken = generateAccessToken(user);
  const newRefreshToken = generateRefreshToken(user, session);

  const hashedRefreshToken = hashToken(newRefreshToken);

  await sessionRepo.updateSession(session.id, {
    refreshToken: hashedRefreshToken,
  });

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
};

export const logout = async (refreshTokenFromCookie) => {
  if (!refreshTokenFromCookie) {
    return;
  }

  let payload;

  try {
    payload = verifyRefreshToken(refreshTokenFromCookie);
  } catch (error) {
    return;
  }

  const session = await sessionRepo.findSessionById(payload.sid);

  if (!session) return;

  await sessionRepo.updateSession(session.id, { isRevoked: true });
};
