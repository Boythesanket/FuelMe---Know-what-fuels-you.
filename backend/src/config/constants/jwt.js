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

export const generateRefreshToken = (user) => {};