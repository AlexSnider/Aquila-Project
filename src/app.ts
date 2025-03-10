import "express-async-errors";
import "reflect-metadata";
import "../src/helpers/container";
import express, { json, Express } from "express";
import router from "./routes";
import mongoose from "mongoose";
import ConnectToMongoDatabase from "./database/production";
import errorMiddleware from "./middleware/errorMiddleware";
import corsMiddleware from "./middleware/corsMiddleware";

const app = express();

app.use(json());
app.use(errorMiddleware.execute);
app.use(corsMiddleware.execute);
app.use(router);

export async function initApp(): Promise<Express> {
  const mongoUrl: string | undefined = process.env.DB_URL;

  if (!mongoUrl) {
    await ConnectToMongoDatabase.execute();
    console.log("Using Production Database...");
  }

  if (mongoUrl) {
    console.log("Using Test Database...");
    await mongoose.connect(mongoUrl);
  }

  return app;
}

export async function close(): Promise<void> {
  return await ConnectToMongoDatabase.disconnect();
}

export default app;
