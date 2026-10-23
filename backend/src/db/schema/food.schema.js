import {
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const foodTable = pgTable("foods", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 200 }).notNull(),
  caloriesPer100g: numeric("calories_per_100g", {
    precision: 8,
    scale: 2,
  }).notNull(),
  carbsPer100g: numeric("carbs_per_100g", { precision: 8, scale: 2 }).notNull(),
  fatPer100g: numeric("fat_per_100g", { precision: 8, scale: 2 }).notNull(),
  source: text("source").notNull(),
  externalId: uuid("external_id"),
  createdAt: timestamp(),
});
