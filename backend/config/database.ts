import mongoose from "mongoose";

async function connectToDatabase() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MongoDB URI not found");
    }

    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to MongoDB: ${connection.connection.host}`);
  } catch (err) {
    throw new Error("MongoDB connection error", { cause: err });
  }
}

await connectToDatabase();

// Handle events after initial connection
const db = mongoose.connection;

db.on("error", err => {
  console.error("MongoDB connection error: ", err);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

db.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

export default db;
