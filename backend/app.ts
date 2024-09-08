import createServer from "./server";
import logger from "./utils/logger";

const PORT = process.env.PORT ?? 3000;

const app = createServer();

app.listen(PORT, () => {
  logger.info(`[server]: Server is running at http://localhost:${PORT}`);
});
