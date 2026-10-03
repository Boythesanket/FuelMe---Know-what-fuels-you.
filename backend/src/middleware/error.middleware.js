import { HTTP_STATUS } from "../config/constants/httpStatus.js";

export const errorHandler = (err, req, res, next) => {
  res.status(err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.details || null,
  });
};
