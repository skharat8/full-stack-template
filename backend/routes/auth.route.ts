import express from "express";

import validateResource from "../middleware/validateResource";
import { signup, login, logout } from "../controllers/auth.controller";
import { userSchema } from "../models/user.model";

const router = express.Router();

router.post("/signup", validateResource(userSchema), signup);

router.get("/login", login);

router.post("/logout", logout);

export default router;
