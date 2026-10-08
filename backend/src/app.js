import express from "express";
import authRouter from "./features/auth/auth.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
const app = express();
import cookieParser from "cookie-parser";

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World");
});

// AUTH ROUTE
app.use("/api/auth", authRouter);

// GLOBAL ERROR HANDLER
app.use(errorHandler);

export default app;
