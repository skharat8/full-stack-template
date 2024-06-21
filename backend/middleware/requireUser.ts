import type { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import StatusCode from "../data/enums";
import type { UserWithSession } from "../models/session.model";

const requireUser = (_: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user as UserWithSession;

  if (!user) {
    next(createHttpError(StatusCode.FORBIDDEN, "Access Denied"));
  } else {
    next();
  }
};

export default requireUser;
