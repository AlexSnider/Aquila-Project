import supertest from "supertest";
import app from "../../../../src/app";
import {
  newCreateSensor,
  newRandomGroupName,
  newRandomUserId,
} from "__tests__/factories/sensor.factories";

const supertestServer = supertest(app);

describe("PUT /api/v1/sensors/insert-group/user-id/:user_id - Insert a group by user ID", () => {
  it("should return 404 when no sensors are found", async () => {
    const fakeUserId = newRandomUserId();
    const exampleGroupName = newRandomGroupName();

    const result = await supertestServer
      .put(`/api/v1/sensors/insert-group/user-id/${fakeUserId}`)
      .send(exampleGroupName);

    expect(result.statusCode).toBe(404);
    expect(result.body).toHaveProperty(
      "message",
      "Sensors collection not found"
    );
  });

  it("should return 409 when the user already has a sensor with the same group name", async () => {
    const sensor = await newCreateSensor();
    const user_id = sensor.user_id;
    const exampleGroupName = sensor.sensor_groups[0].sensor_group_name;

    const result = await supertestServer
      .put(`/api/v1/sensors/insert-group/user-id/${user_id}`)
      .send({ sensor_group_name: exampleGroupName });

    expect(result.statusCode).toBe(409);
    expect(result.body).toHaveProperty("message", "Group already exists");
  });

  it("should return 400 when the group name is not valid", async () => {
    const sensor = await newCreateSensor();
    const user_id = sensor.user_id;

    const result = await supertestServer
      .put(`/api/v1/sensors/insert-group/user-id/${user_id}`)
      .send({ sensor_group_name: 123 });

    expect(result.statusCode).toBe(400);
    expect(result.body).toHaveProperty("errors", [
      '"sensor_group_name" must be a string',
    ]);
  });

  it("should successfully insert a group by user ID", async () => {
    const sensor = await newCreateSensor();
    const user_id = sensor.user_id;
    const exampleGroupName = newRandomGroupName().toString();

    const result = await supertestServer
      .put(`/api/v1/sensors/insert-group/user-id/${user_id}`)
      .send({ sensor_group_name: exampleGroupName });

    expect(result.statusCode).toBe(204);
  });
});
