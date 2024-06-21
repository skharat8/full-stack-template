import type { Request, Response, NextFunction, RequestHandler } from "express";

import { verifyJwt } from "../utils/jwt.utils";
import type { UserWithSession } from "../models/session.model";
import { issueNewAccessToken } from "../services/session.service";

const deserializeUser = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearerHeader = req.headers.authorization ?? "";
  const refreshToken = req.headers["x-refresh-token"] ?? "";

  if (!bearerHeader) {
    return next();
  }

  // The authorization header is formatted as "Bearer <token>"
  const bearerToken = bearerHeader.split(" ")[1];
  const { valid, expired, decodedToken } = verifyJwt(bearerToken);

  if (valid) {
    res.locals.user = decodedToken as UserWithSession;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await issueNewAccessToken(refreshToken[0]);

    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken);
      const result = verifyJwt(newAccessToken);
      res.locals.user = result.decodedToken as UserWithSession;
    }
  }

  return next();
}) as RequestHandler;

export default deserializeUser;
