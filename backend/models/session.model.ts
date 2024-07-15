import mongoose, { Schema } from "mongoose";
import type { DbUser } from "../schemas/user.zod";

type Session = {
  id: string;
  user: DbUser["id"];
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
};

type JwtData = { userId: string; sessionId: string };

const sessionSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    valid: { type: Boolean, default: true },
    userAgent: { type: String },
  },

  { timestamps: true },
);

const SessionModel = mongoose.model<Session>("Session", sessionSchema);

export default SessionModel;
export type { Session, JwtData };
