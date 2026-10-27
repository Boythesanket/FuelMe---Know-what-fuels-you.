import "dotenv/config";
import axios from "axios";
import https from "node:https";
import { db } from "../../db/index.js";
import { foodTable } from "../../db/schema/food.schema.js";
import { and, eq } from "drizzle-orm";

const httpsAgent = new https.Agent({
  family: 4,
});

const USDA_BASE_URL = "https://api.nal.usda.gov/fdc/v1";

export const searchFoodsService = async (query) => {
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

export const saveOrGetFood = async (fdcId) => {
  const details = await getFoodDetails(fdcId);

  const externalId = String(details.fdcId);

  const [existingFood] = await db
    .select()
    .from(foodTable)
    .where(
      and(
        eq(foodTable.source, details.source),
        eq(foodTable.externalId, externalId),
      ),
    );

  if (existingFood) {
    return existingFood;
  }

  const [savedFood] = await db
    .insert(foodTable)
    .values({
      name: details.name,
      caloriesPer100g: String(details.caloriesPer100g),
      proteinPer100g: String(details.proteinPer100g),
      carbsPer100g: String(details.carbsPer100g),
      fatPer100g: String(details.fatPer100g),
      source: details.source,
      externalId,
    })
    .onConflictDoNothing()
    .returning();

  if (savedFood) {
    return savedFood;
  }

  const [food] = await db
    .select()
    .from(foodTable)
    .where(
      and(
        eq(foodTable.source, details.source),
        eq(foodTable.externalId, externalId),
      ),
    )
    .limit(1);

  if (!food) {
    throw new Error("Food could not be saved or retrieved.");
  }

  return food;
};
