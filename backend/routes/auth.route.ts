import express from "express";

import validateResource from "../middleware/validateResource";
import { userZodSchema } from "../schemas/user.zod";
import {
  createUserHandler,
  getUserHandler,
  logout,
} from "../controllers/user.controller";

const router = express.Router();

router.post("/signup", validateResource(userZodSchema), createUserHandler);

router.get("/login", getUserHandler);

router.post("/logout", logout);

export default router;
