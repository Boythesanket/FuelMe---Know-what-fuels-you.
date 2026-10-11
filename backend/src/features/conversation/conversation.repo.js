import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { conversationTable } from "../../db/schema/conversation.schema.js";

export const createConversation = async (userId) => {
  return await db
    .insert(conversationTable)
    .values({ userId: userId })
    .returning();
};

export const findConversation = async (userId) => {
  return await db
    .select()
    .from(conversationTable)
    .where(eq(conversationTable.userId, userId));
};
