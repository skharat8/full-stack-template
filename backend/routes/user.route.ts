import express from "express";

import validateResource from "../middleware/validateResource";
import { createUserSchema } from "../schemas/user.zod";
import createUserHandler from "../controllers/user.controller";

const router = express.Router();

router.post("/", validateResource(createUserSchema), createUserHandler);

export default router;
