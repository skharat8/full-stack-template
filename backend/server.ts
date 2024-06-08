import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import cookieParser from "cookie-parser";
import createError from "http-errors";

import "./config/env";
import "./config/database";
import logger from "./utils/logger";
import StatusCode from "./data/enums";
import authRoutes from "./routes/auth.route";
import errorHandler from "./middleware/errorHandler";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const app = express();
const PORT = process.env.PORT ?? 3000;

/* ---------------------- */
/* Third Party Middleware */
/* ---------------------- */

// HTTP logger. Log to console using req.log.info()
app.use(pinoHttp({ logger }));

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
app.use((_, __, next) => next(createError(StatusCode.NOT_FOUND)));

// Catch all errors.
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`[server]: Server is running at http://localhost:${PORT}`);
});
