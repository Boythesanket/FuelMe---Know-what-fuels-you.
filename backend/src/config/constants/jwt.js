import jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      sub: user.id,
    },
    process.env.JWT_ACCESS_TOKEN,
    {
      expiresIn: "15m",
    },
  );
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
};

export const generateRefreshToken = (user, session) => {
  return jwt.sign(
    {
      sub: user.id,
      sid: session.id,
    },
    process.env.JWT_REFRESH_TOKEN,
    {
      expiresIn: "30d",
    },
  );
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};
