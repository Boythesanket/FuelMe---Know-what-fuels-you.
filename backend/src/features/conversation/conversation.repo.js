import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { conversationTable } from "../../db/schema/conversation.schema.js";

export const createConversation = async (userId) => {
  const [conversation] = await db
    .insert(conversationTable)
    .values({ userId: userId })
    .returning();

  return conversation;
};

export const findConversation = async (userId) => {
  const conversation = await db
    .select()
    .from(conversationTable)
    .where(eq(conversationTable.userId, userId));

  return conversation;
};

export const findConversationById = async (conversationId) => {
  const [conversation] = await db
    .select()
    .from(conversationTable)
    .where(eq(conversationTable.id, conversationId));
};
