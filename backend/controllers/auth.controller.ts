import { type Request, type Response, type RequestHandler } from "express";
import bcrypt from "bcryptjs";

import StatusCode from "../data/enums";
import User from "../models/user";
import generateTokenAndSetCookie from "../utils/generateToken";

export const signup = (async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { username, password, firstName, lastName, email } = req.body;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    res
      .status(StatusCode.BAD_REQUEST)
      .json({ error: "Username not available" });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    res
      .status(StatusCode.BAD_REQUEST)
      .json({ error: "Account already exists with this email" });
  }

  // Generate a hashed password and create a new user
  const salt = await bcrypt.genSalt(10);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const hashedPassword = await bcrypt.hash(password, salt);

  /* eslint-disable */
  const newUser = new User({
    username,
    password: hashedPassword,
    firstName,
    lastName,
    email,
  });
  /* eslint-enable */

  if (newUser) {
    generateTokenAndSetCookie(newUser._id, res);
    await newUser.save();
    res.status(StatusCode.CREATED).json({ _id: newUser._id });
  } else {
    res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to create new user" });
  }
}) as RequestHandler;

export const login = (async (_, res: Response) => {
  res.json({
    data: "You hit the login endpoint",
  });
}) as RequestHandler;

export const logout = (async (_, res: Response) => {
  res.json({
    data: "You hit the logout endpoint",
  });
}) as RequestHandler;
