import type { Request, Response, NextFunction, RequestHandler } from "express";

import { getCookieOptions, verifyJwt } from "../utils/jwt.utils";
import type { JwtData } from "../models/session.model";
import { issueNewAccessToken } from "../services/session.service";
import { findUser } from "../services/user.service";

const setLocals = async (res: Response, decodedToken: JwtData) => {
  const { userId, sessionId } = decodedToken;
  res.locals.user = await findUser({ _id: userId });
  res.locals.sessionId = sessionId;
};

const deserializeUser = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.cookies.AccessToken) {
    return next();
  }

  const accessToken = req.cookies.AccessToken as string;
  const refreshToken = req.cookies.RefreshToken as string;
  const { valid, expired, decodedToken } = verifyJwt(accessToken);

  // If access token is valid, deserialize the user.
  if (valid) {
    await setLocals(res, decodedToken as JwtData);
    return next();
  }

  // If access token is expired while refresh token is valid,
  // issue a new access token and send it back to client.
  if (expired && refreshToken) {
    const newAccessToken = await issueNewAccessToken(refreshToken);

    if (newAccessToken) {
      res.cookie(
        "AccessToken",
        newAccessToken,
        getCookieOptions(process.env.ACCESS_TOKEN_TTL)
      );

      const result = verifyJwt(newAccessToken);
      await setLocals(res, result.decodedToken as JwtData);
    }
  }

  return next();
}) as RequestHandler;

export default deserializeUser;
