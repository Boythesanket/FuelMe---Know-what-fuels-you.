import { getFoodDetails, saveOrGetFood, searchFoods } from "./food.service.js";

const results = await searchFoods("mutton");
// console.log(results);

const food = await saveOrGetFood(167634);
console.log(food);
