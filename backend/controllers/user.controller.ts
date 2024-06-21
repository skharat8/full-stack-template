import type { Request, Response, RequestHandler } from "express";
import asyncHandler from "express-async-handler";

import StatusCode from "../data/enums";
import { createUser } from "../services/user.service";
import type { UserSignup } from "../schemas/user.zod";

const createUserHandler = asyncHandler(
  async (req: Request<object, object, UserSignup>, res: Response) => {
    const newUser = await createUser(req.body);
    res.status(StatusCode.CREATED).json(newUser);
  }
);

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
