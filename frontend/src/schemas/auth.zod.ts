import { z } from "zod";

const userSignupSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

const userLoginSchema = userSignupSchema.omit({ username: true });

const userSchema = userSignupSchema.omit({ password: true }).extend({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

type UserLogin = z.infer<typeof userLoginSchema>;
type UserSignup = z.infer<typeof userSignupSchema>;
type User = z.infer<typeof userSchema>;

export type { UserLogin, UserSignup, User };
export { userLoginSchema, userSignupSchema, userSchema };
