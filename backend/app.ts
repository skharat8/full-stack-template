import connectToDatabase from "./config/database";
import createServer from "./server";
import logger from "./utils/logger";

const PORT = process.env.PORT ?? 3000;

const app = createServer();

await connectToDatabase();

app.listen(PORT, () => {
  logger.info(`[server]: Server is running at http://localhost:${PORT}`);
});
