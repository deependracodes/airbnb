import mongoose from "mongoose";
import { dbConfig } from ".";

export async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(dbConfig.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
}