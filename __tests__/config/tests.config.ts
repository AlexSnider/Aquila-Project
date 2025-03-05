import { GenericContainer, StartedTestContainer } from "testcontainers";
import mongoose from "mongoose";

let mongoContainer: StartedTestContainer;

beforeAll(async () => {
  mongoContainer = await new GenericContainer("mongo:latest")
    .withExposedPorts(27017)
    .start();

  const host = mongoContainer.getHost();
  const port = mongoContainer.getMappedPort(27017);
  const mongoUrl = `mongodb://${host}:${port}/testdb`;

  process.env.DB_URL = mongoUrl;

  await mongoose.connect(mongoUrl);
  console.log("Test Container Up.");
}, 60000);

afterAll(async () => {
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.dropDatabase();
  }

  await mongoose.disconnect();

  if (mongoContainer) {
    await mongoContainer.stop();
    console.log("Test Container Down.");
  }
}, 30000);
