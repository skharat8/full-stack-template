import express from "express";

import "./config/env";
import "./config/database";
import authRoutes from "./routes/auth.route";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
