import createError from "http-errors";

import StatusCode from "../data/enums";
import { UserModel, type User, type DbUser } from "../models/user.model";
import logger from "../utils/logger";

const createUser = async (user: User["body"]): Promise<DbUser> => {
  try {
    return await UserModel.create(user);
  } catch (err) {
    logger.error(err);
    throw createError(StatusCode.CONFLICT, "Failed to create new user");
  }
};

export default createUser;
