import { Router } from "express";
const chatRouter = Router();
import { authenticate } from "../../middleware/authenticate.js";
import * as chatController from "./chats.controller.js";

chatRouter.post("/new", authenticate, chatController.createChat);

export default chatRouter;
