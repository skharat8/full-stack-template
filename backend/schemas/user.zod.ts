import mongoose from "mongoose";
import { z } from "zod";

const createUserSchema = z.object({
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

const userSignupSchema = createUserSchema.shape.body.innerType();

// Interface for document stored in the database
const userDbSchema = userSignupSchema
  .omit({ passwordConfirmation: true })
  .extend({
    _id: z.instanceof(mongoose.Types.ObjectId),
    createdAt: z.date(),
    updatedAt: z.date(),
    isValidPassword: z
      .function()
      .args(z.string())
      .returns(z.promise(z.boolean())),
  });

const safeDbUserSchema = userDbSchema.omit({ password: true });

type UserSignup = z.infer<typeof userSignupSchema>;
type DbUser = z.infer<typeof userDbSchema>;
type SafeDbUser = z.infer<typeof safeDbUserSchema>;

export type { UserSignup, DbUser, SafeDbUser };
export { createUserSchema };
