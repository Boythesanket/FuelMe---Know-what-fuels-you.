import { HTTP_STATUS } from "../../config/constants/httpStatus.js";
import * as conversationService from "./conversation.service.js";

export const findOrCreateConversation = async (req, res) => {
  const { conversationId } = req.body;
  const userId = req.user.sub;

  const conversation = await conversationService.findOrCreateConversation(
    userId,
    conversationId,
  );

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Conversation initiated.",
    data: conversation,
  });
};
