import type { FilterQuery } from "mongoose";
import UserModel from "../models/user.model";
import type { UserSignup, SafeDbUser } from "../schemas/user.zod";

type PasswordValidationResult =
  | { valid: true; data: SafeDbUser }
  | { valid: false; error: string };

const createUser = async (userData: UserSignup): Promise<SafeDbUser> => {
  const user = await UserModel.create(userData);
  return user.toJSON();
};

const validatePassword = async (
  email: string,
  password: string
): Promise<PasswordValidationResult> => {
  const errorMessage = "Invalid username or password";
  const user = await UserModel.findOne({ email });
  if (!user) return { valid: false, error: errorMessage };

  const isValid = await user.isValidPassword(password);
  if (!isValid) return { valid: false, error: errorMessage };

  return { valid: true, data: user.toJSON() };
};

const findUser = async (query: FilterQuery<SafeDbUser>) => {
  const user = await UserModel.findOne(query);
  return user?.toJSON();
};

export { createUser, validatePassword, findUser };
