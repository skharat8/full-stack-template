import express from "express";

import validateResource from "../middleware/validateResource";
import requireUser from "../middleware/requireUser";
import { createUserSchema } from "../schemas/user.zod";
import {
  createUserHandler,
  getUserHandler,
} from "../controllers/user.controller";

const router = express.Router();

router.post("/", validateResource(createUserSchema), createUserHandler);

router.get("/me", requireUser, getUserHandler);

export default router;
