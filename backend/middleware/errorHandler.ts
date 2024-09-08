import { Prisma } from "@prisma/client";
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

    case err instanceof Prisma.PrismaClientKnownRequestError: {
      let errorMessage;

      if (err.code === "P2002") {
        errorMessage = "Unique constraint violation. Failed to create new entry.";
        res.status(StatusCode.CONFLICT).json({ error: errorMessage });
      } else {
        errorMessage = `Encountered a database error. Error code ${err.code}.`;
        res.status(StatusCode.CONFLICT).json({ error: errorMessage });
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
