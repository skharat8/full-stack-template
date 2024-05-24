import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 6 },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },

  { timestamps: true }
);

UserSchema.virtual("name").get(function getFullName() {
  return `${this.firstName} ${this.lastName}`;
});

export default mongoose.model("User", UserSchema);
