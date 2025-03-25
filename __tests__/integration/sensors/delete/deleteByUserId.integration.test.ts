import supertest from "supertest";
import app from "../../../../src/app";
import {
  newCreateSensor,
  newRandomUserId,
} from "__tests__/integration_factories/sensor.factories";

const supertestServer = supertest(app);

describe("DELETE /api/v1/sensors/delete/user-id/:id - Remove a sensor by ID", () => {
  it("Should return 404 when attempting to remove a non-existent sensor", async () => {
    const fakeObjectId = newRandomUserId();

    const result = await supertestServer.delete(
      `/api/v1/sensors/delete/user-id/${fakeObjectId}`
    );

    expect(result.statusCode).toBe(404);
    expect(result.body).toHaveProperty(
      "message",
      "Sensors collection not found"
    );
  });

  it("Should successfully remove a sensor and return status 204", async () => {
    const sensor = await newCreateSensor();
    const userId = sensor.user_id;

    const result = await supertestServer.delete(
      `/api/v1/sensors/delete/user-id/${userId}`
    );

    expect(result.statusCode).toBe(204);
  });
});
