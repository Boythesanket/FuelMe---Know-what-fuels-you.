import { Router } from "express";
const authRouter = Router();
import * as authController from "./auth.controller.js";

authRouter.post("/register", authController.userRegister);

authRouter.post("/login", authController.userLogin);

authRouter.post("/logout", authController.userLogout);

export default authRouter;
