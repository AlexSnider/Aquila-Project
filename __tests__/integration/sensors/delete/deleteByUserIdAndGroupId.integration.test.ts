import supertest from "supertest";
import app from "../../../../src/app";
import {
  newCreateSensor,
  newRandomObjectId,
  newRandomUserId,
} from "__tests__/factories/sensor.factories";

const supertestServer = supertest(app);

describe("DELETE /api/v1/sensors/delete/user-id/:user_id/group-id/:group_id - Remove a sensor group by ID", () => {
  it("Should return 404 when attempting to remove a non-existent group", async () => {
    const fakeUserId = newRandomUserId();
    const fakeGroupId = newRandomObjectId();

    const result = await supertestServer.delete(
      `/api/v1/sensors/delete/user-id/${fakeUserId}/group-id/${fakeGroupId}`
    );

    expect(result.statusCode).toBe(404);
    expect(result.body).toHaveProperty("message", "Group not found");
  });

  it("Should successfully remove a group and return status 204", async () => {
    const sensor = await newCreateSensor();
    const userId = sensor.user_id;
    const groupId = sensor.sensor_groups[0]._id;

    const result = await supertestServer.delete(
      `/api/v1/sensors/delete/user-id/${userId}/group-id/${groupId}`
    );

    expect(result.statusCode).toBe(204);
  });
});
