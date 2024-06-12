import express from "express";

import validateResource from "../middleware/validateResource";
import { signup, login, logout } from "../controllers/auth.controller";
import { userZodSchema } from "../schemas/user.zod";

const router = express.Router();

router.post("/signup", validateResource(userZodSchema), signup);

router.get("/login", login);

router.post("/logout", logout);

export default router;
