import supertest from "supertest";
import app from "../../../../src/app";
import {
  newCreateSensor,
  newInvalidSensorUpdateData,
  newRandomObjectId,
  newRandomSensorUpdateData,
  newRandomUserId,
} from "__tests__/factories/sensor.factories";

const supertestServer = supertest(app);

describe("PUT /api/v1/sensors/user-id/:user_id/sensor-id/:_id - Update sensor data by user ID", () => {
  it("should return 404 when no sensors are found", async () => {
    const fakeUserId = newRandomUserId();
    const fakeObjectId = newRandomObjectId().toString();
    const sensorData = newRandomSensorUpdateData();

    const result = await supertestServer
      .patch(
        `/api/v1/sensors/update/user-id/${fakeUserId}/sensor-id/${fakeObjectId}`
      )
      .send(sensorData);

    expect(result.statusCode).toBe(404);
    expect(result.body).toHaveProperty("message", "Sensor not found");
  });

  it("should return 400 when the sensor data is not valid", async () => {
    const sensor = await newCreateSensor();
    const user_id = sensor.user_id;
    const sensor_id = sensor.sensor_groups[0].sensors[0]._id;
    const sensorData = newInvalidSensorUpdateData();

    const result = await supertestServer
      .patch(`/api/v1/sensors/update/user-id/${user_id}/sensor-id/${sensor_id}`)
      .send(sensorData);

    expect(result.statusCode).toBe(400);
    expect(result.body).toHaveProperty("errors", [
      '"sensor_name" must be a string',
      '"location.type" must be [Point]',
      '"location.coordinates[0]" must be a number',
    ]);
  });

  it("should successfully update a sensor by user ID", async () => {
    const sensor = await newCreateSensor();
    const user_id = sensor.user_id;
    const sensor_id = sensor.sensor_groups[0].sensors[0]._id;
    const sensorData = newRandomSensorUpdateData();

    const result = await supertestServer
      .patch(`/api/v1/sensors/update/user-id/${user_id}/sensor-id/${sensor_id}`)
      .send(sensorData);

    expect(result.statusCode).toBe(204);
  });
});
