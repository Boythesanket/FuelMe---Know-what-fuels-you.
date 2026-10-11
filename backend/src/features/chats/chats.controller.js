import { HTTP_STATUS } from "../../config/constants/httpStatus.js";
import { saveMessage } from "./chats.service.js";

export const createChat = async (req, res) => {
  const { conversationId, content } = req.body;
  const userId = req.user;

  const chat = await saveMessage(conversationId, content, userId);

  res.status(HTTP_STATUS.OK).json({
    success: true,
  });
};
