import supertest from "supertest";
import app from "../../../src/app";
import {
  newCreateSensor,
  newRandomUserId,
} from "__tests__/factories/sensor.factories";

const supertestServer = supertest(app);

describe("GET /sensors/users-sensors/:user_id - Retrieve sensors by user ID", () => {
  it("should return 404 when user ID is not found", async () => {
    const fakeObjectId = newRandomUserId();
    const result = await supertestServer.get(
      `/sensors/users-sensors/${fakeObjectId}`
    );

    expect(result.statusCode).toBe(404);
    expect(result.body).toHaveProperty("message", "No sensors found");
  });

  it("should successfully return user sensors with status 200 and an array of sensors", async () => {
    const sensor = await newCreateSensor();
    const user_sensorId = sensor.user_id;

    const result = await supertestServer.get(
      `/sensors/users-sensors/${user_sensorId}`
    );

    expect(result.statusCode).toBe(200);
    expect(result.body).toBeInstanceOf(Array);
  });
});
