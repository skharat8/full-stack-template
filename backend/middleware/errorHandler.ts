import type { Request, Response, NextFunction } from "express";
import { HttpError } from "http-errors";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

import StatusCode from "../data/enums";
import logger from "../utils/logger";

// Catch all errors encountered in the app.
const errorHandler = (
  err: unknown,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  switch (true) {
    case err instanceof ZodError: {
      const validationError = fromZodError(err);
      logger.error(validationError.details, validationError.message);
      res.status(StatusCode.BAD_REQUEST).json({ error: validationError });
      break;
    }

    case err instanceof HttpError: {
      logger.error(err, err.message);
      res
        .status(err.status || StatusCode.INTERNAL_SERVER_ERROR)
        .json({ error: err.message, stack: err.stack });
      break;
    }

    case err instanceof Error: {
      logger.error(err, err.message);
      res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json({ error: err.message, cause: err.cause, stack: err.stack });
      break;
    }

    default:
      logger.error(err);
      res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json({ error: "Unknown Error!" });
  }
};

export default errorHandler;
