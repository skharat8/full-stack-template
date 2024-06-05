import path from "path";
import { fileURLToPath } from "url";
import express, { type Request, type Response } from "express";
import cors from "cors";
import logger from "morgan";
import cookieParser from "cookie-parser";
import createError, { type HttpError } from "http-errors";

import "./config/env";
import "./config/database";
import StatusCode from "./data/enums";
import authRoutes from "./routes/auth.route";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const app = express();
const PORT = process.env.PORT ?? 3000;

/* ---------------------- */
/* Third Party Middleware */
/* ---------------------- */

// HTTP request logger. Logs to console after every request in this format.
// :method :url :status :res[content-length] - :response-time ms
app.use(logger("dev"));

// Enable cross-origin requests. This is needed because client and server
// are located on different ports. A URL's origin is defined by combination
// of protocol (http), hostname (example.com), and port (3000).
app.use(cors());

// Parse incoming JSON requests (application/json) into req.body
app.use(express.json());

// Parse requests (application/x-www-form-urlencoded) with URL-encoded payload.
// Example: /urlencoded?firstname=xx&lastname=yy for POST & PUT requests.
app.use(express.urlencoded({ extended: false }));

// Parse cookie header and populate req.cookies
app.use(cookieParser());

// Serves static assets such as HTML files, CSS files, images
app.use(express.static(path.join(dirname, "public")));

/* ---------------------- */
/*  App Level Middleware  */
/* ---------------------- */
app.use("/api/auth", authRoutes);

/* --------------------------- */
/*  Error Handling Middleware  */
/* --------------------------- */

// Catch requests to unknown routes.
app.use((_, __, next) => next(createError(404)));

app.use((err: HttpError, _: Request, res: Response) => {
  console.error(err.message);

  if (err.name === "ValidationError") {
    return res.status(StatusCode.BAD_REQUEST).json({ error: err.message });
  }

  // Default Error
  return res
    .status(err.status || StatusCode.INTERNAL_SERVER_ERROR)
    .json({ error: err.message, stack: err.stack });
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
