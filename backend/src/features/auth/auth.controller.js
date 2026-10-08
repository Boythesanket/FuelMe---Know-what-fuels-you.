import { HTTP_STATUS } from "../../config/constants/httpStatus.js";
import * as authService from "./auth.service.js";

export const userRegister = async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.register({
    ...req.body,
    sessionInfo: {
      userAgent: req.get("User-Agent"),
      ipAddress: req.ip,
    },
  });

  res.cookie("accessToken", accessToken);

  res.cookie("refreshToken", refreshToken);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "User registered successfully.",
    data: user,
  });
};

export const userLogin = async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.login({
    ...req.body,
    sessionInfo: {
      userAgent: req.get("User-Agent"),
      ipAddress: req.ip,
    },
  });

  res.cookie("accessToken", accessToken);

  res.cookie("refreshToken", refreshToken);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Logged in successfully.",
    data: user,
  });
};

export const refreshToken = async (req, res) => {
  const { accessToken, refreshToken } = authService.refreshToken(
    req.cookies.refreshToken,
  );

  res.cookie("accessToken", accessToken);

  res.cookie("refreshToken", refreshToken);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Token refreshed.",
  });
};

export const userLogout = async (req, res) => {
  await authService.logout(req.cookies.refreshToken);

  res.clearCookie("accessToken");

  res.clearCookie("refreshToken");

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Logged out successfully.",
  });
};
