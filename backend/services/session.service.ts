import mongoose from "mongoose";
import type { FilterQuery, UpdateQuery } from "mongoose";
import type { Session, UserWithSession } from "../models/session.model";
import SessionModel from "../models/session.model";
import { signJwt, verifyJwt } from "../utils/jwt.utils";

const createSession = async (
  userId: mongoose.Types.ObjectId,
  userAgent: string
): Promise<Session> => {
  const session = await SessionModel.create({ user: userId, userAgent });
  return session.toJSON();
};

const findSessions = (query: FilterQuery<Session>) =>
  SessionModel.find(query).lean();

const updateSession = (
  query: FilterQuery<Session>,
  update: UpdateQuery<Session>
) => SessionModel.updateOne(query, update);

const generateNewAccessToken = async (
  refreshToken: string
): Promise<string | false> => {
  const result = verifyJwt(refreshToken);
  if (!result.valid) return false;

  // Check if the user session is valid
  const user = result.decodedToken as UserWithSession;
  const session = await SessionModel.findById(user.sessionId);
  if (!session || !session.valid) return false;

  return signJwt({ ...user }, { expiresIn: process.env.ACCESS_TOKEN_TTL });
};

export { createSession, findSessions, updateSession, generateNewAccessToken };
