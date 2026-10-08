import { HTTP_STATUS } from "../../config/constants/httpStatus.js";
import * as authService from "./auth.service.js";
import {
  accessCookieOptions,
  refreshTokenOptions,
} from "../../config/constants/cookie.js";
import { wrapAsync } from "../../utils/wrapAsync.js";

//
// USER REGISTER CONTROLLER
//
export const userRegister = wrapAsync(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.register({
    ...req.body,
    sessionInfo: {
      userAgent: req.get("User-Agent"),
      ipAddress: req.ip,
    },
  });

  res.cookie("accessToken", accessToken, accessCookieOptions);

  res.cookie("refreshToken", refreshToken, refreshTokenOptions);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "User registered successfully.",
    data: user,
  });
});

//
// USER LOGIN CONTROLLER
//
export const userLogin = wrapAsync(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.login({
    ...req.body,
    sessionInfo: {
      userAgent: req.get("User-Agent"),
      ipAddress: req.ip,
    },
  });

  res.cookie("accessToken", accessToken, accessCookieOptions);

  res.cookie("refreshToken", refreshToken, refreshTokenOptions);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Logged in successfully.",
    data: user,
  });
});

//
// REFRESH TOKEN CONTROLLER
//
export const refreshToken = wrapAsync(async (req, res) => {
  const { accessToken, refreshToken } = authService.refreshToken(
    req.cookies.refreshToken,
  );

  res.cookie("accessToken", accessToken, accessCookieOptions);

  res.cookie("refreshToken", refreshToken, refreshTokenOptions);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Token refreshed.",
  });
});

//
// USER LOGOUT CONTROLLER
//
export const userLogout = wrapAsync(async (req, res) => {
  await authService.logout(req.cookies.refreshToken);

  res.clearCookie("accessToken", accessCookieOptions);

  res.clearCookie("refreshToken", refreshTokenOptions);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Logged out successfully.",
  });
});
