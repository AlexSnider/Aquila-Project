import supertest from "supertest";
import app from "../../../src/app";
import {
  newCreateSensor,
  newRandomSensorId,
} from "__tests__/factories/sensor.factories";

const supertestServer = supertest(app);

describe("DELETE /sensors/delete/:id - Delete a sensor by ID", () => {
  it("should return 404 when attempting to delete a non-existent sensor", async () => {
    const fakeObjectId = newRandomSensorId();

    const result = await supertestServer.delete(
      `/sensors/delete/${fakeObjectId}`
    );

    expect(result.statusCode).toBe(404);
    expect(result.body).toHaveProperty("message", "Sensor not found");
  });

  it("should successfully delete a sensor and return status 204", async () => {
    const sensor = await newCreateSensor();
    const sensorId = sensor._id;

    const result = await supertestServer.delete(`/sensors/delete/${sensorId}`);

    expect(result.statusCode).toBe(204);
  });
});
