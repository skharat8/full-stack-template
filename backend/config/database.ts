import mongoose from "mongoose";
import logger from "../utils/logger";

const listenForDatabaseEvents = () => {
  // Handle events after initial connection
  const db = mongoose.connection;

  db.on("error", err => {
    logger.error(err, "MongoDB connection error");
  });

  db.on("connected", () => {
    logger.info("Connected to MongoDB");
  });

  db.on("disconnected", () => {
    logger.info("Disconnected from MongoDB");
  });
};

const connectToDatabase = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      const message = "MongoDB URI not found";
      logger.fatal(message);
      throw new Error(message);
    }

    listenForDatabaseEvents();
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (err) {
    logger.error(err, "MongoDB connection error");
    process.exit(1);
  }
};

export default connectToDatabase;
