import supertest from "supertest";
import app from "../../../../src/app";
import {
  newCreateSensor,
  newRandomObjectId,
  newRandomUserId,
} from "__tests__/factories/sensor.factories";

const supertestServer = supertest(app);

describe("DELETE /api/v1/sensors/delete/user-id/:user_id/sensor-id/:sensor_id - Remove a sensor by ID", () => {
  it("Should return 404 when attempting to remove a non-existent sensor", async () => {
    const fakeUserId = newRandomUserId();
    const fakeSensorId = newRandomObjectId();

    const result = await supertestServer.delete(
      `/api/v1/sensors/delete/user-id/${fakeUserId}/sensor-id/${fakeSensorId}`
    );

    expect(result.statusCode).toBe(404);
    expect(result.body).toHaveProperty("message", "Sensor not found");
  });

  it("Should successfully remove a sensor and return status 204", async () => {
    const sensor = await newCreateSensor();
    const userId = sensor.user_id;
    const sensorId = sensor.sensor_groups[0].sensors[0]._id;

    const result = await supertestServer.delete(
      `/api/v1/sensors/delete/user-id/${userId}/sensor-id/${sensorId}`
    );

    expect(result.statusCode).toBe(204);
  });
});
