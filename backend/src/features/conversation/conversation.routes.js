import { Router } from "express";
const conversationRouter = Router();
import { authenticate } from "../../middleware/authenticate.js";

conversationRouter.post("/", authenticate);

export default conversationRouter;
