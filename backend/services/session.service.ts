import type { FilterQuery } from "mongoose";
import type { Session, JwtData } from "../models/session.model";
import SessionModel from "../models/session.model";
import { signJwt, verifyJwt } from "../utils/jwt.utils";

const createSession = async (
  userId: string,
  userAgent: string
): Promise<Session> => {
  const session = await SessionModel.create({ user: userId, userAgent });
  return session.toJSON();
};

const findSessions = (query: FilterQuery<Session>) =>
  SessionModel.find(query).lean();

const deleteSession = (query: FilterQuery<Session>) =>
  SessionModel.deleteOne(query);

const issueNewAccessToken = async (
  refreshToken: string
): Promise<string | false> => {
  // Verify refresh token
  const result = verifyJwt(refreshToken);
  if (!result.valid) return false;

  // Check if the user session is valid
  const { userId, sessionId } = result.decodedToken as JwtData;
  const session = await SessionModel.findById(sessionId);
  if (!session || !session.valid) return false;

  return signJwt(
    { userId, sessionId },
    { expiresIn: process.env.ACCESS_TOKEN_TTL }
  );
};

export { createSession, findSessions, deleteSession, issueNewAccessToken };
