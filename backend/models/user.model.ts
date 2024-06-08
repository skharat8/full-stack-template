import { z } from "zod";
import bcrypt from "bcryptjs";
import mongoose, { Schema, Types } from "mongoose";

// Zod Validation
const userSchema = z.object({
  body: z
    .object({
      username: z.string(),
      password: z.string().min(6),
      passwordConfirmation: z.string().min(6),
      firstName: z.string(),
      lastName: z.string(),
      email: z.string().email(),
    })
    .refine(data => data.password === data.passwordConfirmation, {
      message: "Password Mismatch!",
      path: ["passwordConfirmation"],
    }),
});

type User = z.infer<typeof userSchema>;

// User type stored in the database
const userDbSchema = userSchema.shape.body
  .innerType()
  .omit({
    passwordConfirmation: true,
  })
  .extend({ createdAt: z.date(), updatedAt: z.date() });

type DbUser = z.infer<typeof userDbSchema> & { _id: Types.ObjectId };

// Database model
const userMongoSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 6 },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },

  { timestamps: true }
);

userMongoSchema.virtual("name").get(function getFullName() {
  return `${this.firstName} ${this.lastName}`;
});

userMongoSchema.pre("save", async function generateHashedPassword(next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);

  this.password = hashedPassword;
  return next();
});

userMongoSchema.methods.comparePasswords = async function comparePasswords(
  this: DbUser,
  userPassword: string
): Promise<boolean> {
  return bcrypt.compare(userPassword, this.password);
};

const UserModel = mongoose.model("User", userMongoSchema);

export type { User, DbUser };
export { userSchema, UserModel };
