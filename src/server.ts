import "reflect-metadata";
import "./helpers/container";
import express from "express";
import ConnectToDatabase from "./database";
import router from "./routes";

const app = express();

app.use(express.json());
ConnectToDatabase.execute();
app.use(router);

const PORT = 3005;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
