import mongoose from "mongoose";
import "dotenv/config";

class ConnectToDatabase {
  async execute() {
    const mongoUrl = process.env.MONGO_URI as string;

    try {
      await mongoose.connect(mongoUrl);
      console.log("MongoDB connected!");
    } catch (error: any) {
      console.log(error);
    }
  }

  async disconnect() {
    await mongoose.disconnect();
  }
}

export default new ConnectToDatabase();
