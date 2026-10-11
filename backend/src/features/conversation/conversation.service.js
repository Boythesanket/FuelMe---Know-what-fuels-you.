import { HTTP_STATUS } from "../../config/constants/httpStatus.js";
import ExpressError from "../../utils/ExpressError.js";
import * as conversationRepo from "./conversation.repo.js";

export const findOrCreateConversation = async (userId) => {
  const conversation = await conversationRepo.findConversation(userId);

  if (!conversation) {
    throw new ExpressError(
      "Could not found the conversation",
      HTTP_STATUS.NOT_FOUND,
    );
  }
  
};
