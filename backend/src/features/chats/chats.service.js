import { HTTP_STATUS } from "../../config/constants/httpStatus.js";
import ExpressError from "../../utils/ExpressError.js";
import { findConversationById } from "../conversation/conversation.repo.js";
import { findUserById } from "../users/user.repository.js";
import * as chatRepo from "./chats.repo.js";

export const saveMessage = async (conversationId, content, userId) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new ExpressError("User does not exists", HTTP_STATUS.NOT_FOUND);
  }

  const conversation = await findConversationById(conversationId, userId);

  if (!conversation) {
    throw new ExpressError(
      "Conversation does not exists",
      HTTP_STATUS.NOT_FOUND,
    );
  }

  const chat = await chatRepo.createChat(conversationId, content, "user");

  return chat;

};
