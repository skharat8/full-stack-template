import mongoose from "mongoose";
import logger from "../utils/logger";
import UserModel from "../models/user.model";

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

const defineToJSON = () => {
  mongoose.set("toJSON", {
    transform: (document, returnedObject) => {
      // Convert MongoDB ObjectId to string ID
      returnedObject.id = (
        returnedObject._id as mongoose.Types.ObjectId
      ).toString();

      delete returnedObject._id;
      delete returnedObject.__v;

      // Don't reveal user password
      if (document instanceof UserModel) {
        delete returnedObject.password;
      }
    },
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
    defineToJSON();
  } catch (err) {
    logger.error(err, "MongoDB connection error");
    process.exit(1);
  }
};

export default connectToDatabase;
