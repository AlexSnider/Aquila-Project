import supertest from "supertest";
import app from "../../../../src/app";
import {
  newCreateSensor,
  newRandomObjectId,
  newRandomUserId,
} from "__tests__/factories/sensor.factories";

const supertestServer = supertest(app);

describe("GET /api/v1/sensors/user-id/:user_id/group-id/:_id - Retrieve sensors by user ID and group ID", () => {
  it("should return 404 when no groups are found", async () => {
    const fakeUserId = newRandomUserId();
    const fakeObjectId = newRandomObjectId();

    const result = await supertestServer.get(
      `/api/v1/sensors/user-id/${fakeUserId}/group-id/${fakeObjectId}`
    );

    expect(result.statusCode).toBe(404);
    expect(result.body).toHaveProperty("message", "No groups found");
  });

  it("should return 200 and groups when user has sensors", async () => {
    const sensor = await newCreateSensor();
    const user_id = sensor.user_id;
    const group_id = sensor.sensor_groups[0]._id;

    const result = await supertestServer.get(
      `/api/v1/sensors/user-id/${user_id}/group-id/${group_id}`
    );

    expect(result.statusCode).toBe(200);
    expect(result.body).toBeInstanceOf(Array);
  });
});
