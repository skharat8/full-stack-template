import type { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import StatusCode from "../data/enums";
import * as UserService from "../services/user.service";
import type { UserSignup } from "../schemas/user.zod";

const createUserHandler = asyncHandler(
  async (req: Request<object, object, UserSignup>, res: Response) => {
    const newUser = await UserService.createUser(req.body);
    res.status(StatusCode.CREATED).json(newUser);
  }
);

const getCurrentUserHandler = asyncHandler((_: Request, res: Response) => {
  res.json(res.locals.user);
});

const getUserHandler = asyncHandler(async (req: Request, res: Response) => {
  const { username } = req.params;
  const user = await UserService.findUser({ username });

  res.json(user);
});

export { createUserHandler, getCurrentUserHandler, getUserHandler };
