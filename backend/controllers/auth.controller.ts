import { type Response } from "express";
import asyncHandler from "express-async-handler";

export const signup = asyncHandler(async (_, res: Response) => {
  res.json({
    data: "You hit the signup endpoint",
  });
});

export const login = asyncHandler(async (_, res: Response) => {
  res.json({
    data: "You hit the login endpoint",
  });
});

export const logout = asyncHandler(async (_, res: Response) => {
  res.json({
    data: "You hit the logout endpoint",
  });
});
