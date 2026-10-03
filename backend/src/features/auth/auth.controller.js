import * as authService from "./auth.service.js";

export const userRegister = async (req, res) => {
  const { user } = await authService.register({ ...req.body });

  res.status(201).json({
    success: true,
    message: "User registered successfully.",
  });
};
