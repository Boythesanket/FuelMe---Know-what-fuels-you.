import { Router } from "express";
const authRouter = Router();
import * as authController from "./auth.controller.js";

authRouter.post("/register", authController.userRegister);

export default authRouter;
