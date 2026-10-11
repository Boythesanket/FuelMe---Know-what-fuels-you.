import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { userTable } from "./user.schema.js";

export const conversationTable = pgTable("conversation", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => userTable.id)
    .notNull(),
  title: text("title").default(null),
  createdAt: timestamp("created_at").defaultNow(),
});
