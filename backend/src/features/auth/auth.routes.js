import { Router } from "express";
const authRouter = Router();
import * as authController from "./auth.controller.js";

authRouter.post("/register", authController.userRegister);

authRouter.post("/login", authController.userLogin);

authRouter.post("/logout", authController.userLogout);

authRouter.post("refreshToken", authController.refreshToken);

export default authRouter;
