import createHttpError from "http-errors";
import util from "node:util";
import type { Prisma } from "@prisma/client";
import prisma from "../prisma/customClient";
import type { UserSignup, SafeDbUser } from "../schemas/user.zod";
import StatusCode from "../data/enums";

type PasswordValidationResult =
  | { valid: true; data: SafeDbUser }
  | { valid: false; error: string };

async function createUser(userData: UserSignup): Promise<SafeDbUser> {
  return prisma.user.create({
    data: userData,
  });
}

async function validatePassword(
  email: string,
  password: string,
): Promise<PasswordValidationResult> {
  const errorMessage = "Invalid username or password";
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return { valid: false, error: errorMessage };

  const isValid = await user.isValidPassword(password);
  if (!isValid) return { valid: false, error: errorMessage };

  return { valid: true, data: user };
}

async function findUser(query: Prisma.UserWhereInput): Promise<SafeDbUser> {
  const user = await prisma.user.findFirst({ where: query });

  if (!user) {
    const errorMessage = `User ${util.inspect(query)} not found`;
    throw createHttpError(StatusCode.NOT_FOUND, errorMessage);
  }

  return user;
}

export { createUser, validatePassword, findUser };
