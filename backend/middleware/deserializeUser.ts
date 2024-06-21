import type { Request, Response, NextFunction } from "express";

import { verifyJwt } from "../utils/jwt.utils";
import type { UserWithSession } from "../models/session.model";

const deserializeUser = (req: Request, res: Response, next: NextFunction) => {
  const bearerHeader = req.headers.authorization ?? "";

  if (!bearerHeader) {
    return next();
  }

  // The authorization header is formatted as "Bearer <token>"
  const bearerToken = bearerHeader.split(" ")[1];
  const { valid, decodedToken } = verifyJwt(bearerToken);

  if (valid) {
    res.locals.user = decodedToken as UserWithSession;
  }

  return next();
};

export default deserializeUser;
