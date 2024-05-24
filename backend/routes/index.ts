import express from "express";

const router = express.Router();

/* GET Home Page. */
router.get("/", (_, res) => {
  res.redirect("/api/auth/login");
});

export default router;
