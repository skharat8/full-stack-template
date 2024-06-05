import mongoose, { Schema } from "mongoose";

interface IUser {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
}

const userSchema = new Schema<IUser>(
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

const User = mongoose.model<IUser>("User", userSchema);

export type { IUser };
export default User;
