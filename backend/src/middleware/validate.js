import { HTTP_STATUS } from "../config/constants/httpStatus.js";
import ExpressError from "../utils/ExpressError.js";

export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    throw new ExpressError(
      "Validation Error",
      HTTP_STATUS.BAD_REQUEST,
      result.error.issues.map(({ path, message }) => ({
        field: path.join("."),
        message,
      })),
    );
  }

  req.body = result.data;
  next();
};
