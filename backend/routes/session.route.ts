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

router.post("/", validateResource(createSessionSchema), createSessionHandler);
router.get("/", requireUser, getSessionsHandler);
router.delete("/", requireUser, deleteSessionHandler);

export default router;
