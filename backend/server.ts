import path from "path";
import { fileURLToPath } from "url";
import express, { type Request, type Response } from "express";
import logger from "morgan";
import cookieParser from "cookie-parser";
import createError, { type HttpError } from "http-errors";

import "./config/env";
import "./config/database";
import authRoutes from "./routes/auth.route";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const app = express();
const PORT = process.env.PORT ?? 3000;

// Third Party Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(dirname, "public")));

// App Level Middleware
app.use("/api/auth", authRoutes);

// Error Handling Middleware
// Catch 404 and forward to error handler.
app.use((_, __, next) => next(createError(404)));

// Error Handler
app.use((err: HttpError, req: Request, res: Response) => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
