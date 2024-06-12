import UserModel from "../models/user.model";
import logger from "../utils/logger";
import type { UserSignup, DbUser } from "../schemas/user.zod";

const createUser = async (
  userData: UserSignup
): Promise<Omit<DbUser, "password">> => {
  const user = await UserModel.create(userData);
  const { password, ...rest } = user.toJSON();
  return rest;
};

const deleteUser = () => {
  logger.info("Unimplemented");
};

export { createUser, deleteUser };
