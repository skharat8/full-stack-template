import mongoose, { Schema } from "mongoose";
import type { DbUser, SafeDbUser } from "../schemas/user.zod";

type Session = {
  _id: mongoose.Types.ObjectId;
  user: DbUser["_id"];
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
};

type UserWithSession = SafeDbUser & { sessionId: mongoose.Types.ObjectId };

const sessionSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    valid: { type: Boolean, default: true },
    userAgent: { type: String },
  },

  { timestamps: true }
);

const SessionModel = mongoose.model<Session>("Session", sessionSchema);

export default SessionModel;
export type { Session, UserWithSession };
