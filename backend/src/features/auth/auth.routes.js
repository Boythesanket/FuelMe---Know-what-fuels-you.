import { Router } from "express";
const authRouter = Router();
import * as authController from "./auth.controller.js";
import { validate } from "../../middleware/validate.js";
import { loginSchema, registerSchema } from "./auth.validation.js";

authRouter.post(
  "/register",
  validate(registerSchema),
  authController.userRegister,
);

authRouter.post("/login", validate(loginSchema), authController.userLogin);

authRouter.post("/logout", authController.userLogout);

authRouter.post("/refreshToken", authController.refreshToken);

export default authRouter;

