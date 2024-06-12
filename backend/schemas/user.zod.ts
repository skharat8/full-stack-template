import mongoose from "mongoose";
import { z } from "zod";

const userZodSchema = z.object({
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

const userSignupSchema = userZodSchema.shape.body
  .innerType()
  .omit({ passwordConfirmation: true });

const userLoginSchema = userZodSchema.shape.body
  .innerType()
  .pick({ email: true, password: true });

// Schema for document stored in the database
const userDbSchema = userSignupSchema.extend({
  _id: z.instanceof(mongoose.Types.ObjectId),
  createdAt: z.date(),
  updatedAt: z.date(),
});

type UserSignup = z.infer<typeof userSignupSchema>;
type UserLogin = z.infer<typeof userLoginSchema>;
type DbUser = z.infer<typeof userDbSchema>;

export type { UserSignup, UserLogin, DbUser };
export { userZodSchema };
