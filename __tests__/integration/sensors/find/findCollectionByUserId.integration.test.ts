import supertest from "supertest";
import app from "../../../../src/app";
import {
  newCreateSensor,
  newRandomUserId,
} from "__tests__/integration_factories/sensor.factories";

const supertestServer = supertest(app);

describe("GET /api/v1/sensors/user-id/:id - Retrieve sensor by user ID", () => {
  it("should return 404 when sensor ID is not found", async () => {
    await newCreateSensor();

    const fakeUserId = newRandomUserId();
    const result = await supertestServer.get(
      `/api/v1/sensors/user-id/${fakeUserId}`
    );

    expect(result.statusCode).toBe(404);
    expect(result.body).toHaveProperty(
      "message",
      "No sensors collections found"
    );
  });

  it("should successfully return a sensor for a user with status 200", async () => {
    const sensor = await newCreateSensor();
    const sensorId = sensor.user_id;

    const result = await supertestServer.get(
      `/api/v1/sensors/user-id/${sensorId}`
    );

    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(String),
          user_id: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          sensor_groups: expect.arrayContaining([
            expect.objectContaining({
              _id: expect.any(String),
              sensor_group_name: expect.any(String),
              sensors: expect.arrayContaining([
                expect.objectContaining({
                  _id: expect.any(String),
                  sensor_name: expect.any(String),
                  location: expect.objectContaining({
                    type: expect.any(String),
                    coordinates: expect.arrayContaining([
                      expect.any(Number),
                      expect.any(Number),
                    ]),
                  }),
                }),
              ]),
            }),
          ]),
        }),
      ])
    );
  });
});
