export const accessCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 15 * 60 * 1000,
};

export const refreshTokenOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV == "production",
  sameSite: "lax",
  maxAge: 30 * 24 * 60 * 60 * 1000,
};
