import mongoose from "mongoose";
import logger from "../utils/logger";

async function connectToDatabase() {
  try {
    if (!process.env.MONGODB_URI) {
      const message = "MongoDB URI not found";
      logger.fatal(message);
      throw new Error(message);
    }

    await mongoose.connect(process.env.MONGODB_URI);
    logger.info("Connected to MongoDB");
  } catch (err) {
    logger.error(err, "MongoDB connection error");
    process.exit(1);
  }
}

await connectToDatabase();

// Handle events after initial connection
const db = mongoose.connection;

db.on("error", err => {
  logger.error(err, "MongoDB connection error");
});

db.once("open", () => {
  logger.info("Connected to MongoDB");
});

db.on("disconnected", () => {
  logger.info("Disconnected from MongoDB");
});

export default db;
