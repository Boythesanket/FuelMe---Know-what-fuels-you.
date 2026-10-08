import { HTTP_STATUS } from "../config/constants/httpStatus.js";
import { verifyAccessToken } from "../config/constants/jwt.js";
import ExpressError from "../utils/ExpressError.js";

export const authenticate = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    throw new ExpressError("Authentication required", HTTP_STATUS.UNAUTHORIZED);
  }

  let payload;

  try {
    payload = verifyAccessToken(accessToken);
  } catch (error) {
    throw new ExpressError("Invalid access token", HTTP_STATUS.UNAUTHORIZED);
  }

  req.user = payload;

  next();  
};
