import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { conversationTable } from "./conversation.schema.js";

export const role = pgEnum("role", ["user", "assistant"]);

export const chatTable = pgTable("chats", {
  id: uuid("id").defaultRandom().primaryKey(),
  conversationId: uuid("conversation_id")
    .references(() => conversationTable.id, { onDelete: "cascade" })
    .notNull(),
  role: role(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
