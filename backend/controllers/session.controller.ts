import type { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import createHttpError from "http-errors";

import StatusCode from "../data/enums";
import type { UserLogin } from "../schemas/session.zod";
import { validatePassword } from "../services/user.service";
import { getCookieOptions, signJwt } from "../utils/jwt.utils";
import {
  createSession,
  findSessions,
  deleteSession,
} from "../services/session.service";

const createSessionHandler = asyncHandler(
  async (
    req: Request<object, object, UserLogin>,
    res: Response,
    next: NextFunction
  ) => {
    // Authenticate the user
    const user = await validatePassword(req.body.email, req.body.password);

    if (user.valid) {
      // Create a session using user ID
      const session = await createSession(
        user.data.id,
        req.get("user-agent") ?? ""
      );

      // Generate an access token and refresh token for this session
      const { ACCESS_TOKEN_TTL, REFRESH_TOKEN_TTL } = process.env;

      const accessToken = signJwt(
        { userId: user.data.id, sessionId: session.id },
        { expiresIn: ACCESS_TOKEN_TTL }
      );

      const refreshToken = signJwt(
        { userId: user.data.id, sessionId: session.id },
        { expiresIn: REFRESH_TOKEN_TTL }
      );

      const accessCookieOptions = getCookieOptions(ACCESS_TOKEN_TTL);
      const refreshCookieOptions = getCookieOptions(REFRESH_TOKEN_TTL);
      res.cookie("AccessToken", accessToken, accessCookieOptions);
      res.cookie("RefreshToken", refreshToken, refreshCookieOptions);
      res.json(user.data);
    } else {
      next(createHttpError(StatusCode.UNAUTHORIZED, user.error));
    }
  }
);

const getSessionsHandler = asyncHandler(async (_: Request, res: Response) => {
  const { user } = res.locals;
  const sessions = await findSessions({ user: user?.id, valid: true });

  res.json({ sessions });
});

const deleteSessionHandler = asyncHandler(async (_: Request, res: Response) => {
  await deleteSession({ _id: res.locals.sessionId });
  res.clearCookie("AccessToken");
  res.clearCookie("RefreshToken");

  res.json({ msg: "Session deleted" });
});

export { createSessionHandler, getSessionsHandler, deleteSessionHandler };
