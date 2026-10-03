import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  fullName: varchar("full_name", { length: 100 }).notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
});
