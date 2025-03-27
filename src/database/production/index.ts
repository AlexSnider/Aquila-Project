import mongoose from "mongoose";
import "dotenv/config";

class ConnectToDatabase {
  async execute() {
    const mongoUrl = process.env.MONGO_URI as string;

    try {
      await mongoose.connect(mongoUrl);
      console.log("MongoDB connected!");
    } catch (error: unknown) {
      throw new Error(`Error connecting to MongoDB: ${error}`);
    }
  }

  async disconnect() {
    await mongoose.disconnect();
  }
}

export default new ConnectToDatabase();
