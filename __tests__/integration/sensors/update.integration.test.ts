import supertest from "supertest";
import app from "../../../src/app";
import {
  newCreateSensor,
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

  it("should return 500 when attempting to update a non-existent sensor", async () => {
    const fakeObjectId = newRandomSensorId();

    const result = await supertestServer
      .patch(`/sensors/update/${fakeObjectId}`)
      .send({ sensor_name: "Updated Sensor" });

    expect(result.statusCode).toBe(500);
  });
});
