import jwt from "jsonwebtoken";
import { type Response } from "express";
import { Types } from "mongoose";

const generateToken = (userId: Types.ObjectId): string => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as jwt.Secret, {
    expiresIn: "7d",
  });

  return token;
};

const setCookie = (token: string, res: Response) => {
  const ageInMs = 7 * 24 * 60 * 60 * 1000; // 7 days

  res.cookie("jwt", token, {
    maxAge: ageInMs,
    httpOnly: true, // Prevent XSS attacks (cross-site scripting)
    sameSite: "strict", // Prevent CSRF attacks (cross-site request forgery)
    secure: process.env.NODE_ENV !== "development",
  });
};

export { generateToken, setCookie };
