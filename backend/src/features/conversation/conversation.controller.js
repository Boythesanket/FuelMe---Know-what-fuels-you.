import { HTTP_STATUS } from "../../config/constants/httpStatus.js";

export const findOrCreateConversation = async (req, res) => {
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Conversation initiated.",
  });
};
