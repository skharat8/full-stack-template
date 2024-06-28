import { z } from "zod";

const createUserSchema = z.object({
  body: z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
  }),
});

const userSignupSchema = createUserSchema.shape.body;

// Interface for document stored in the database
const userDbSchema = userSignupSchema.extend({
  id: z.string(),
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
