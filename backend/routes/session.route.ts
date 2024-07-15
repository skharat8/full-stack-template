import express from "express";

import validateResource from "../middleware/validateResource";
import { createSessionSchema } from "../schemas/session.zod";
import requireUser from "../middleware/requireUser";
import {
  createSessionHandler,
  deleteSessionHandler,
  getSessionsHandler,
} from "../controllers/session.controller";

const router = express.Router();

router.post(
  "/login",
  validateResource(createSessionSchema),
  createSessionHandler,
);

router.get("/", requireUser, getSessionsHandler);
router.delete("/logout", requireUser, deleteSessionHandler);

export default router;
