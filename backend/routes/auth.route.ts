import express from "express";

import validateResource from "../middleware/validateResource";
import { userLoginZodSchema, userZodSchema } from "../schemas/user.zod";
import { createUserHandler, logout } from "../controllers/user.controller";
import { createSessionHandler } from "../controllers/session.controller";

const router = express.Router();

router.post("/signup", validateResource(userZodSchema), createUserHandler);

router.post(
  "/login",
  validateResource(userLoginZodSchema),
  createSessionHandler
);

router.post("/logout", logout);

export default router;
