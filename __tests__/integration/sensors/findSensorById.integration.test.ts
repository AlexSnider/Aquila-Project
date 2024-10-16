import supertest from "supertest";
import app from "../../../src/app";
import {
  newCreateSensor,
  newRandomSensorId,
} from "__tests__/factories/sensor.factories";

const supertestServer = supertest(app);

describe("GET /sensors/:id - Retrieve sensor by ID", () => {
  

  it("should return 404 when sensor ID is not found", async () => {
    const fakeObjectId = newRandomSensorId();
    const result = await supertestServer.get(`/sensors/${fakeObjectId}`);

    expect(result.statusCode).toBe(404);
    expect(result.body).toHaveProperty("message", "Sensor not found");
  });

  it("should successfully return a sensor with status 200", async () => {
    const sensor = await newCreateSensor();
    const sensorId = sensor._id;

    const result = await supertestServer.get(`/sensors/${sensorId}`);

    expect(result.statusCode).toBe(200);
    expect(result.body).toBeInstanceOf(Object);
  });
});
