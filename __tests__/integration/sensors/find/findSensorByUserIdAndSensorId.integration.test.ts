import supertest from "supertest";
import app from "../../../../src/app";
import {
  newCreateSensor,
  newRandomObjectId,
  newRandomUserId,
} from "__tests__/integration_factories/sensor.factories";

const supertestServer = supertest(app);

describe("GET /api/v1/sensors/user-id/:user_id/sensor-id/:_id - Retrieve sensor by user ID and sensor ID", () => {
  it("should return 404 when sensor is not found", async () => {
    const fakeUserId = newRandomUserId();
    const fakeSensorId = newRandomObjectId();

    const result = await supertestServer.get(
      `/api/v1/sensors/user-id/${fakeUserId}/sensor-id/${fakeSensorId}`
    );

    expect(result.statusCode).toBe(404);
    expect(result.body).toHaveProperty("message", "Sensor not found");
  });

  it("should return 200 and the sensor if the user has sensors", async () => {
    const sensor = await newCreateSensor();
    const user_id = sensor.user_id;
    const sensor_id = sensor.sensor_groups[0].sensors[0]._id;

    const result = await supertestServer.get(
      `/api/v1/sensors/user-id/${user_id}/sensor-id/${sensor_id}`
    );

    expect(result.statusCode).toBe(200);
    expect(result.body).toBeInstanceOf(Array);
  });
});
