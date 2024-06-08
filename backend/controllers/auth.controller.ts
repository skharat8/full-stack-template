import type { Request, Response, RequestHandler, NextFunction } from "express";

import StatusCode from "../data/enums";
import generateTokenAndSetCookie from "../utils/generateToken";
import type { User } from "../models/user.model";
import createUser from "../services/user.service";

const signup = (async (
  req: Request<object, object, User["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser = await createUser(req.body);
    generateTokenAndSetCookie(newUser._id, res);
    res.status(StatusCode.CREATED).json({ _id: newUser._id });
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

const login = ((_, res: Response) => {
  res.json({
    data: "You hit the login endpoint",
  });
}) as RequestHandler;

const logout = ((_, res: Response) => {
  res.json({
    data: "You hit the logout endpoint",
  });
}) as RequestHandler;

export { signup, login, logout };
