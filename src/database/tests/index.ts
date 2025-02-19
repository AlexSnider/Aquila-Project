import { GenericContainer, StartedTestContainer } from "testcontainers";
import mongoose from "mongoose";
import SensorSchema from "src/modules/v1/Sensors/schemas/SensorSchema";

class ConnectToTestDatabase {
  private mongoContainer: StartedTestContainer | null = null;

  async execute() {
    try {
      this.mongoContainer = await new GenericContainer("mongo:latest")
        .withExposedPorts(27017)
        .start();

      const host = this.mongoContainer.getHost();
      const port = this.mongoContainer.getMappedPort(27017);

      const mongoUrl = `mongodb://${host}:${port}/testdb`;

      await mongoose.connect(mongoUrl);

      console.log(`Test Container Up.`);
    } catch (error: unknown) {
      console.log("Test Container Error:", error);
    }
  }

  async disconnect() {
    if (this.mongoContainer) {
      await SensorSchema.deleteMany({});
      await mongoose.disconnect();
      await this.mongoContainer.stop();
      console.log("Test Container Down.");
    }
  }
}

export default new ConnectToTestDatabase();
