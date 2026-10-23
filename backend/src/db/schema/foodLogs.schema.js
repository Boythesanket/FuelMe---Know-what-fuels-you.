import { numeric, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { userTable } from "./user.schema.js";
import { foodTable } from "./food.schema.js";

export const foodLogsTable = pgTable("food_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => userTable.id, { onDelete: "cascade" })
    .notNull(),
  foodId: uuid("food_id")
    .references(() => foodTable.id, { onDelete: "restrict" })
    .notNull(),
  quantityGrams: numeric("quantity_grams", {
    precision: 8,
    scale: 2,
  }).notNull(),
  calories: numeric("calories", { precision: 10, scale: 2 }).notNull(),
  protein: numeric("protein", { precision: 8, scale: 2 }).notNull(),
  carbs: numeric("carbs", { precision: 8, scale: 2 }).notNull(),
  fat: numeric("fat", { precision: 8, scale: 2 }).notNull(),
  loggedAt: timestamp("logged_at").defaultNow().notNull(),
});
