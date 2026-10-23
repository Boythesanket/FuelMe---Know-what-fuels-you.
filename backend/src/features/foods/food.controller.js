import { getFoodDetails, searchFoods } from "./food.service.js";

const results = await searchFoods("banana");
console.log(results);

const food = await getFoodDetails(171116);
// console.log(food);