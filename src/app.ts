import "express-async-errors";
import "reflect-metadata";
import "../src/helpers/container";
import express, { json, Express } from "express";
import ConnectToMongoDatabase from "./database/production";
import ConnectToTestDatabase from "./database/tests";
import router from "../src/routes";
import errorMiddleware from "../src/middleware/errorMiddleware";

const app = express();

app.use(json());
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
  } else {
    await ConnectToMongoDatabase.disconnect();
  }
}

export default app;
