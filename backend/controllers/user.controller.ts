import type { Request, Response } from "express";
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

export default createUserHandler;
