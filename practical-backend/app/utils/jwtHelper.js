import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateAccessToken = async (userId) => {
  try {
    const token = jwt.sign({ userId }, process.env.ACCESS_SECRET_KEY, {
      expiresIn: process.env.ACCESS_EXPIRATION_TIME,
    });
    return token;
  } catch (error) {
    console.log(error);
  }
};

export const verifyAccessToken = async (req, res, next) => {
  try {
    if (!req.headers["authorization"]) return next("Unauthorize User");
    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];
    const tokenClaim = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
    if (tokenClaim) {
      req.userId = tokenClaim.userId;
      next();
    }
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return next("Unauthorize User");
    } else {
      return next(error.message);
    }
  }
};