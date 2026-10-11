import { Router } from "express";
const conversationRouter = Router();
import { authenticate } from "../../middleware/authenticate.js";
import * as conversationController from "./conversation.controller.js";

conversationRouter.post(
  "/new",
  authenticate,
  conversationController.findOrCreateConversation,
);

export default conversationRouter;
