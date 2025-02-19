import "express-async-errors";
import "reflect-metadata";
import "../src/helpers/container";
import express, { json, Express } from "express";
import router from "./routes";
import ConnectToMongoDatabase from "./database/production";
import ConnectToTestDatabase from "./database/tests";
import errorMiddleware from "./middleware/errorMiddleware";
import corsMiddleware from "./middleware/corsMiddleware";

const app = express();

app.use(json());
app.use(corsMiddleware.execute);
app.use(router);
app.use(errorMiddleware.execute);

export async function initApp(): Promise<Express> {
  if (process.env.NODE_ENV === "test") {
    await ConnectToTestDatabase.execute();
  } else {
    await ConnectToMongoDatabase.execute();
  }
  
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  if (process.env.NODE_ENV === "test") {
    await ConnectToTestDatabase.disconnect();
  }

  return await ConnectToMongoDatabase.disconnect();
}

export default app;
