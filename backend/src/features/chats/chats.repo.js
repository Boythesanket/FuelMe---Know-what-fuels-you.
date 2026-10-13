import { db } from "../../db/index.js";
import { chatTable } from "../../db/schema/chat.schema.js";

export const createChat = async (conversationId, content, role) => {
  return await db
    .insert(chatTable)
    .values({ conversationId, content, role })
    .returning();
};
