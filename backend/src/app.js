import express from "express";
import authRouter from "./features/auth/auth.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
const app = express();
import cookieParser from "cookie-parser";
import conversationRouter from "./features/conversation/conversation.routes.js";
import chatRouter from "./features/chats/chats.routes.js";

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World");
});

// AUTH ROUTE
app.use("/api/auth", authRouter);

// CONVERSATION ROUTE
app.use("/api/conversation", conversationRouter);

// CHAT ROUTE
app.use("/api/chat", chatRouter);

// GLOBAL ERROR HANDLER
app.use(errorHandler);

export default app;
