import "dotenv/config";
import axios from "axios";
import https from "node:https";

const httpsAgent = new https.Agent({
  family: 4,
});

const USDA_BASE_URL = "https://api.nal.usda.gov/fdc/v1";

export const searchFoods = async (query) => {
  if (!query?.trim()) {
    throw new Error("Search query is required.");
  }

  const response = await axios.post(
    `${USDA_BASE_URL}/foods/search`,
    {
      query: query.trim(),
      dataType: ["Foundation", "SR Legacy"],
      pageSize: 10,
    },
    {
      params: {
        api_key: process.env.USDA_API_KEY,
      },
      timeout: 30000,
      httpsAgent,
    },
  );

  return response.data.foods.map((food) => ({
    fdcId: food.fdcId,
    name: food.description,
    dataType: food.dataType,
    brandOwner: food.brandOwner ?? null,
  }));
};

// GET FOOD BY ID
export const getFoodDetails = async (fdcId) => {
  const response = await axios.get(`${USDA_BASE_URL}/food/${fdcId}`, {
    params: {
      api_key: process.env.USDA_API_KEY,
    },
    timeout: 30000,
    httpsAgent,
  });

  const food = response.data;

  const getNutrient = (nutrientNumber) => {
    const nutrient = food.foodNutrients.find(
      (item) => item.nutrient?.number === String(nutrientNumber),
    );
    return nutrient?.amount ?? null;
  };

  return {
    fdcId: food.fdcId,
    name: food.description,
    caloriesPer100g: getNutrient("208"),
    proteinPer100g: getNutrient("203"),
    fatPer100g: getNutrient("204"),
    carbsPer100g: getNutrient("205"),
    source: "USDA FoodData Central",
  };
};
