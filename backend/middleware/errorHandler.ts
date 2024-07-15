import mongoose from "mongoose";
import type { Request, Response, NextFunction } from "express";
import { HttpError } from "http-errors";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

import StatusCode from "../data/enums";
import logger from "../utils/logger";

// Catch all errors encountered in the app.
function errorHandler(
  err: unknown,
  _: Request,
  res: Response,
  __: NextFunction,
) {
  if (!(err instanceof ZodError)) logger.error(err);

  switch (true) {
    case err instanceof ZodError: {
      const validationError = fromZodError(err);
      logger.error(validationError.details, validationError.message);
      res.status(StatusCode.BAD_REQUEST).json({ error: validationError });
      break;
    }

    case err instanceof mongoose.mongo.MongoError: {
      if (err.code === 11000) {
        const errorMessage = "Duplicate key error. Failed to create new entry.";
        res.status(StatusCode.CONFLICT).json({ error: errorMessage });
      } else {
        res.status(StatusCode.CONFLICT).json({ error: err.message });
      }
      break;
    }

    case err instanceof HttpError: {
      res
        .status(err.status || StatusCode.INTERNAL_SERVER_ERROR)
        .json({ error: err.message });
      break;
    }

    case err instanceof Error: {
      res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json({ error: err.message, cause: err.cause });
      break;
    }

    default:
      res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json({ error: "Unknown Error!" });
  }
}

export default errorHandler;
