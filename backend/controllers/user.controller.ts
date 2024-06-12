import type { Request, Response, RequestHandler, NextFunction } from "express";
import createHttpError from "http-errors";

import logger from "../utils/logger";
import StatusCode from "../data/enums";
import { createUser } from "../services/user.service";
import type { UserSignup } from "../schemas/user.zod";
// import { generateToken, setCookie } from "../utils/jwt.utils";

const createUserHandler = (async (
  req: Request<object, object, UserSignup>,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser = await createUser(req.body);

    // const jwt = generateToken(newUser._id);
    // setCookie(jwt, res);

    res.status(StatusCode.CREATED).json(newUser);
  } catch (err) {
    logger.error(err);
    next(createHttpError(StatusCode.CONFLICT, "Failed to create new user"));
  }
}) as RequestHandler;

const getUserHandler = ((_, res: Response) => {
  res.json({
    data: "You hit the login endpoint",
  });
}) as RequestHandler;

const logout = ((_, res: Response) => {
  res.json({
    data: "You hit the logout endpoint",
  });
}) as RequestHandler;

export { createUserHandler, getUserHandler, logout };
