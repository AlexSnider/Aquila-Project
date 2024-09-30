import express from "express";
import ConnectToDatabase from "./database";

const app = express();
app.use(express.json());

ConnectToDatabase.execute();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
