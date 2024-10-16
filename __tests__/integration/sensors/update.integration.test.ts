import supertest from "supertest";
import app from "../../../src/app";
import {
  newCreateSensor,
  newInvalidSensorCoordinate,
  newInvalidSensorName,
  newRandomSensorId,
} from "__tests__/factories/sensor.factories";

const supertestServer = supertest(app);

describe("PATCH /sensors/update/:id - Update a sensor by ID", () => {
  it("should successfully update a sensor and return status 204", async () => {
    const sensor = await newCreateSensor();
    const sensorId = sensor._id;

    const result = await supertestServer
      .patch(`/sensors/update/${sensorId}`)
      .send({ sensor_name: "Updated Sensor" });

    expect(result.statusCode).toBe(204);
  });

  it("should return 404 when attempting to update a non-existent sensor", async () => {
    const fakeObjectId = newRandomSensorId();

    const result = await supertestServer
      .patch(`/sensors/update/${fakeObjectId}`)
      .send({ sensor_name: "Updated Sensor" });

    expect(result.statusCode).toBe(404);
    expect(result.body).toHaveProperty("message", "Sensor not found");
  });

  it("should return 403 when attempting to update user_id", async () => {
    const sensor = await newCreateSensor();
    const sensorId = sensor._id;

    const result = await supertestServer
      .patch(`/sensors/update/${sensorId}`)
      .send({ user_id: "123" });

    expect(result.statusCode).toBe(403);
    expect(result.body).toHaveProperty("message", "Not allowed to update");
  });

  it("should return 409 when coordinates are not an array of two numbers", async () => {
    const sensor = await newCreateSensor();
    const sensorId = sensor._id;

    const result = await supertestServer
      .patch(`/sensors/update/${sensorId}`)
      .send({ coordinates: newInvalidSensorCoordinate() });

    expect(result.statusCode).toBe(409);
    expect(result.body).toHaveProperty(
      "message",
      "Coordinates must be an array of two numbers"
    );
  });

  it("should return 409 when sensor_name is not a string", async () => {
    const sensor = await newCreateSensor();
    const sensorId = sensor._id;

    const result = await supertestServer
      .patch(`/sensors/update/${sensorId}`)
      .send({ sensor_name: newInvalidSensorName() });

    expect(result.statusCode).toBe(409);
    expect(result.body).toHaveProperty(
      "message",
      "Sensor name must be a string"
    );
  });
});
