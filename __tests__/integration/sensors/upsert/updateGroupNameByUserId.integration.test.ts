import supertest from "supertest";
import app from "../../../../src/app";
import {
  newCreateSensor,
  newRandomGroupName,
  newRandomObjectId,
  newRandomUserId,
} from "__tests__/factories/sensor.factories";

const supertestServer = supertest(app);

describe("PUT /api/v1/sensors/update/user-id/:user_id/group-id/:_id - Update group name by user ID", () => {
  it("should return 404 when no groups are found", async () => {
    const fakeUserId = newRandomUserId();
    const groupId = newRandomObjectId();
    const groupName = newRandomGroupName().toString();

    const result = await supertestServer
      .patch(`/api/v1/sensors/update/user-id/${fakeUserId}/group-id/${groupId}`)
      .send({ sensor_group_name: groupName });

    expect(result.statusCode).toBe(404);
    expect(result.body).toHaveProperty("message", "Group not found");
  });

  it("should return 400 when the group name is not valid", async () => {
    const sensor = await newCreateSensor();
    const user_id = sensor.user_id;
    const groupId = sensor.sensor_groups[0]._id;
    const groupName = 123;

    const result = await supertestServer
      .patch(`/api/v1/sensors/update/user-id/${user_id}/group-id/${groupId}`)
      .send({ sensor_group_name: groupName });

    expect(result.statusCode).toBe(400);
    expect(result.body).toHaveProperty("errors", [
      '"sensor_group_name" must be a string',
    ]);
  });

  it("should successfully update the group name by user ID", async () => {
    const sensor = await newCreateSensor();
    const user_id = sensor.user_id;
    const groupId = sensor.sensor_groups[0]._id;
    const groupName = newRandomGroupName().toString();

    const result = await supertestServer
      .patch(`/api/v1/sensors/update/user-id/${user_id}/group-id/${groupId}`)
      .send({ sensor_group_name: groupName });

    expect(result.statusCode).toBe(204);
  });
});
