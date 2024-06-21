import type { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import createHttpError from "http-errors";

import StatusCode from "../data/enums";
import type { UserLogin } from "../schemas/user.zod";
import type { UserWithSession } from "../models/session.model";
import { createSession, findSessions } from "../services/session.service";
import { validatePassword } from "../services/user.service";
import { signJwt } from "../utils/jwt.utils";

// const setCookie = (
//   cookieName: string,
//   token: string,
//   age: string,
//   res: Response
// ) => {
//   const ageInMs = convertDurationToMs(age);

//   res.cookie(cookieName, token, {
//     maxAge: ageInMs,
//     httpOnly: true, // Prevent XSS attacks (cross-site scripting)
//     sameSite: "strict", // Prevent CSRF attacks (cross-site request forgery)
//     secure: process.env.NODE_ENV !== "development",
//   });
// };

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
        user.data._id,
        req.get("user-agent") ?? ""
      );

      // Generate an access token and refresh token for this session
      const accessToken = signJwt(
        { ...user.data, session: session._id.toString() },
        { expiresIn: process.env.ACCESS_TOKEN_TTL }
      );

      const refreshToken = signJwt(
        { ...user.data, session: session._id.toString() },
        { expiresIn: process.env.REFRESH_TOKEN_TTL }
      );

      res.json({ accessToken, refreshToken });
    } else {
      next(createHttpError(StatusCode.UNAUTHORIZED, user.error));
    }
  }
);

const getSessionsHandler = asyncHandler(async (_: Request, res: Response) => {
  const user = res.locals.user as UserWithSession;
  const sessions = await findSessions({ user: user._id, valid: true });

  res.json({ sessions });
});

export { createSessionHandler, getSessionsHandler };
