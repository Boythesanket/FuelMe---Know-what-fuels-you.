import * as authService from "./auth.service.js";

export const userRegister = async (req, res) => {
  const { user, accessToken } = await authService.register({
    ...req.body,
    sessionInfo: {
      userAgent: req.get("User-Agent"),
      ipAddress: req.ip,
    },
  });

  res.status(201).json({
    success: true,
    message: "User registered successfully.",
  });
};
