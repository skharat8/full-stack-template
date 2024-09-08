import { z } from "zod";
import type { Prisma } from "@prisma/client";
import type prisma from "../prisma/customClient";

const createUserSchema = z.object({
  body: z.object({
    username: z.string().trim(),
    email: z.string().trim().email(),
    password: z.string().min(6),
    firstName: z.string().trim().nullish(),
    lastName: z.string().trim().nullish(),
  }),
});

const userSignupSchema = createUserSchema.shape.body;

type UserSignup = z.infer<typeof userSignupSchema>;
type DbUser = Prisma.Result<
  typeof prisma.user,
  Prisma.UserCreateInput,
  "create"
>;
type SafeDbUser = Omit<DbUser, "password">;

export type { UserSignup, DbUser, SafeDbUser };
export { createUserSchema };
