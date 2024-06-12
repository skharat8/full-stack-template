import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import type { DbUser } from "../schemas/user.zod";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 6 },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },

  { timestamps: true }
);

userSchema.virtual("name").get(function getFullName() {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.pre("save", async function generateHashedPassword(next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);

  this.password = hashedPassword;
  return next();
});

userSchema.methods.comparePasswords = async function comparePasswords(
  this: DbUser,
  inputPassword: string
): Promise<boolean> {
  return bcrypt.compare(inputPassword, this.password);
};

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
