import UserModel from "../models/user.model";
import type { UserSignup, SafeDbUser } from "../schemas/user.zod";

type PasswordValidationResult =
  | { valid: true; data: SafeDbUser }
  | { valid: false; error: string };

const createUser = async (userData: UserSignup): Promise<SafeDbUser> => {
  const user = await UserModel.create(userData);
  const { password, ...rest } = user.toJSON();
  return rest;
};

const validatePassword = async (
  email: string,
  userPassword: string
): Promise<PasswordValidationResult> => {
  const user = await UserModel.findOne({ email });
  if (!user) return { valid: false, error: "No account found" };

  const isValid = await user.isValidPassword(userPassword);
  if (!isValid) return { valid: false, error: "Wrong password" };

  const { password, ...rest } = user.toJSON();
  return { valid: true, data: rest };
};

export { createUser, validatePassword };
