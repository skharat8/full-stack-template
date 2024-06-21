import mongoose from "mongoose";
import type { FilterQuery } from "mongoose";
import SessionModel, { type Session } from "../models/session.model";

const createSession = async (
  userId: mongoose.Types.ObjectId,
  userAgent: string
): Promise<Session> => {
  const session = await SessionModel.create({ user: userId, userAgent });
  return session.toJSON();
};

const findSessions = async (query: FilterQuery<Session>) =>
  SessionModel.find(query).lean();

export { createSession, findSessions };
