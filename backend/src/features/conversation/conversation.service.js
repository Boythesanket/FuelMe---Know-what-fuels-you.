import { HTTP_STATUS } from "../../config/constants/httpStatus.js";
import ExpressError from "../../utils/ExpressError.js";
import * as conversationRepo from "./conversation.repo.js";
import { findUserById } from "../users/user.repository.js";

export const findOrCreateConversation = async (userId, conversationId) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new ExpressError("User does not exists", HTTP_STATUS.NOT_FOUND);
  }

  const conversation = await conversationRepo.findConversationById(
    conversationId,
    userId,
  );

  if (!conversation) {
    return await conversationRepo.createConversation(userId);
  }

  return conversation;
};
