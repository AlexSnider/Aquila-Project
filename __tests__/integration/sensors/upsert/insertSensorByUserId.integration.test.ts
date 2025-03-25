import supertest from "supertest";
import app from "../../../../src/app";
import {
  newCreateSensor,
  newInvalidSensorInsertData,
  newRandomObjectId,
  newRandomSensorName,
  newRandomUserId,
  newSensorData,
} from "__tests__/integration_factories/sensor.factories";

const supertestServer = supertest(app);

describe("PUT /api/v1/sensors/insert-sensor/user-id/:user_id/group-id/:group_id - Insert a sensor by group ID", () => {
  it("should return 404 when no groups are found", async () => {
    const fakeUserId = newRandomUserId();
    const groupId = newRandomObjectId();
    const sensorName = newRandomSensorName().toString();

    const result = await supertestServer
      .put(
        `/api/v1/sensors/insert-sensor/user-id/${fakeUserId}/group-id/${groupId}`
      )
      .send({ sensor_name: sensorName });

    expect(result.statusCode).toBe(404);
    expect(result.body).toHaveProperty("message", "Group not found");
  });

  it("should return 409 when the user already has a sensor with the same sensor name", async () => {
    const sensor = await newCreateSensor();
    const user_id = sensor.user_id;
    const groupId = sensor.sensor_groups[0]._id;
    const exampleSensorName = sensor.sensor_groups[0].sensors[0].sensor_name;

    const result = await supertestServer
      .put(
        `/api/v1/sensors/insert-sensor/user-id/${user_id}/group-id/${groupId}`
      )
      .send({ sensor_name: exampleSensorName });

    expect(result.statusCode).toBe(409);
    expect(result.body).toHaveProperty("message", "Sensor name already exists");
  });

  it("should return 400 when the sensor data is not valid", async () => {
    const sensor = await newCreateSensor();
    const user_id = sensor.user_id;
    const groupId = sensor.sensor_groups[0]._id;
    const invalidSensorData = newInvalidSensorInsertData();

    const result = await supertestServer
      .put(
        `/api/v1/sensors/insert-sensor/user-id/${user_id}/group-id/${groupId}`
      )
      .send(invalidSensorData);

    expect(result.statusCode).toBe(400);
    expect(result.body).toHaveProperty("errors", [
      '"sensor_name" must be a string',
      '"coordinates.type" must be [Point]',
      '"coordinates.coordinates[0]" must be a number',
    ]);
  });

  it("should successfully insert a sensor by user ID", async () => {
    const sensor = await newCreateSensor();
    const user_id = sensor.user_id;
    const groupId = sensor.sensor_groups[0]._id.toString();
    const sensorData = newSensorData();

    const result = await supertestServer
      .put(
        `/api/v1/sensors/insert-sensor/user-id/${user_id}/group-id/${groupId}`
      )
      .send(sensorData);

    expect(result.statusCode).toBe(204);
  });
});
