import supertest from "supertest";
import app from "../../../../src/app";
import { newCreateSensor } from "__tests__/factories/sensor.factories";

const supertestServer = supertest(app);

describe("GET /api/v1/sensors/all - Retrieve all sensors", () => {
  it("should return 404 when no sensors are found", async () => {
    const result = await supertestServer.get("/api/v1/sensors/all");

    expect(result.statusCode).toBe(404);
    expect(result.body).toHaveProperty(
      "message",
      "No sensors collections found"
    );
  });

  it("should return 200 and an array of sensors when sensors are present", async () => {
    await newCreateSensor();
    const result = await supertestServer.get("/api/v1/sensors/all");

    expect(result.statusCode).toBe(200);
    expect(result.body).toBeInstanceOf(Array);
    expect(result.body.length).toBeGreaterThan(0);
  });
});
