import { pgTable, uuid } from "drizzle-orm/pg-core";

export const chatTable = pgTable("chats", {
    id: uuid("id").defaultRandom().primaryKey(),
    
})