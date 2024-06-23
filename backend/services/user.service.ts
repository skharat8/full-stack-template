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
  const user = await UserModel.findOne({ email });
  if (!user) return { valid: false, error: "No account found" };

  const isValid = await user.isValidPassword(password);
  if (!isValid) return { valid: false, error: "Wrong password" };

  return { valid: true, data: user.toJSON() };
};

export { createUser, validatePassword };
