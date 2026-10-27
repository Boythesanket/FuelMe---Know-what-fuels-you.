import express from "express";
import { searchFoods } from "./food.controller.js";
const foodRouter = express.Router();

foodRouter.get("/search", searchFoods);

// foodRouter.get("/:fdcId");

export default foodRouter;
