import jwt from "jsonwebtoken";
import { type Response } from "express";
import { Types } from "mongoose";

const generateTokenAndSetCookie = (userId: Types.ObjectId, res: Response) => {
  // Generate JWT Token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as jwt.Secret, {
    expiresIn: "7d",
  });

  // Set cookie
  const ageInMs = 7 * 24 * 60 * 60 * 1000; // 7 days

  res.cookie("jwt", token, {
    maxAge: ageInMs,
    httpOnly: true, // Prevent XSS attacks (cross-site scripting)
    sameSite: "strict", // Prevent CSRF attacks (cross-site request forgery)
    secure: process.env.NODE_ENV !== "development",
  });
};

export default generateTokenAndSetCookie;
