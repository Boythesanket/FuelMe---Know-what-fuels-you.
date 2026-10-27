import { getFoodDetails, saveOrGetFood, searchFoodsService } from "./food.service.js";


const food = await saveOrGetFood(167634);
// console.log(food);

export const searchFoods = async (req, res, next) => {
  try {
    const { query } = req.query;

    if (typeof query !== "string" || query.trim()) {
      return res.status(400).json({
        message: "A food search query is required.",
      });
    }

    const foods = await searchFoodsService(query);

    return res.status(200).json({ foods });
  } catch (error) {
    next(error);
  }
};
