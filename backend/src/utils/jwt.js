import jwt from "jsonwebtoken";
import { UnauthorizedError, AppError } from "../errors/appErrors.js";

const SECRET_KEY = process.env.SECRET_KEY;

export const createToken = async (userId) => {
  const payload = { userId };
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
}

export const verifyToken = async (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new UnauthorizedError("Token expired");
    }
    if (error.name === "JsonWebTokenError") {
      throw new UnauthorizedError("Invalid token");
    }
    if (error.name === "NotBeforeError") {
      throw new UnauthorizedError("Token not active");
    }
    throw new AppError("Token verification failed", 500);
  }
}