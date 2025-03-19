import supertest from "supertest";
import app from "../../../../src/app";
import {
  newCreateSensor,
  newInvalidCoordinates,
  newInvalidCoordinatesWithInvalidArray,
  newInvalidMissingFields,
  newInvalidSensorGroupOrSensorName,
  newInvalidSensorSchema,
  newInvalidUserCollectionAlreadyExists,
  newInvalidUserId,
  newSensor,
} from "__tests__/factories/sensor.factories";

const supertestServer = supertest(app);

describe("POST /api/v1/sensors/new-sensor - Sensor creation tests", () => {
  it("should return 400 when creating a sensor with invalid coordinates", async () => {
    const sensor = newInvalidCoordinates();
    const result = await supertestServer
      .post("/api/v1/sensors/new-sensor")
      .send(sensor);

    expect(result.statusCode).toBe(400);
    expect(result.body).toHaveProperty("errors", [
      '"sensor_groups[0].sensors[0].location.type" must be [Point]',
      '"sensor_groups[0].sensors[0].location.type" is not allowed to be empty',
      '"sensor_groups[0].sensors[0].location.coordinates[0]" must be a number',
    ]);
  });

  it("should return 400 when creating a sensor with an invalid array of coordinates", async () => {
    const sensor = newInvalidCoordinatesWithInvalidArray();
    const result = await supertestServer
      .post("/api/v1/sensors/new-sensor")
      .send(sensor);

    expect(result.statusCode).toBe(400);
    expect(result.body).toHaveProperty("errors", [
      '"sensor_groups[0].sensors[0].location.coordinates" must contain 2 items',
    ]);
  });

  it("should return 400 when creating a sensor with an invalid group or sensor name", async () => {
    const sensor = newInvalidSensorGroupOrSensorName();
    const result = await supertestServer
      .post("/api/v1/sensors/new-sensor")
      .send(sensor);

    expect(result.statusCode).toBe(400);
    expect(result.body).toHaveProperty("errors", [
      '"sensor_groups[0].sensor_group_name" must be a string',
      '"sensor_groups[0].sensors[0].sensor_name" length must be at least 4 characters long',
    ]);
  });

  it("should return 400 when creating a sensor with an invalid user ID", async () => {
    const sensor = newInvalidUserId();
    const result = await supertestServer
      .post("/api/v1/sensors/new-sensor")
      .send(sensor);

    expect(result.statusCode).toBe(400);
    expect(result.body).toHaveProperty("errors", [
      '"user_id" must be a valid GUID',
    ]);
  });

  it("should return 400 when creating a sensor with missing fields", async () => {
    const sensor = newInvalidMissingFields();
    const result = await supertestServer
      .post("/api/v1/sensors/new-sensor")
      .send(sensor);

    expect(result.statusCode).toBe(400);
    expect(result.body).toHaveProperty("errors", [
      '"sensor_groups[0].sensor_group_name" is required',
      '"sensor_groups[0].sensors[0].sensor_name" is required',
    ]);
  });

  it("should return 400 when sensor schema validation fails", async () => {
    const sensor = newInvalidSensorSchema();
    const result = await supertestServer
      .post("/api/v1/sensors/new-sensor")
      .send(sensor);

    expect(result.statusCode).toBe(400);
    expect(result.body).toHaveProperty("errors");
  });

  it("should return 409 when the user already has a sensor collection", async () => {
    await newCreateSensor();

    const sensor = newInvalidUserCollectionAlreadyExists();
    const result = await supertestServer
      .post("/api/v1/sensors/new-sensor")
      .send(sensor);

    expect(result.statusCode).toBe(409);
    expect(result.body).toHaveProperty(
      "message",
      "Sensor collection already exists"
    );
  });

  it("should return 201 and create all sensor groups and sensors successfully when valid data is provided", async () => {
    const sensor = newSensor();
    const result = await supertestServer
      .post("/api/v1/sensors/new-sensor")
      .send(sensor);

    expect(result.statusCode).toBe(201);
    expect(result.body).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        user_id: sensor.user_id,
        createdAt: expect.stringMatching(
          /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/
        ),
        updatedAt: expect.stringMatching(
          /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/
        ),
        sensor_groups: expect.arrayContaining(
          sensor.sensor_groups.map((group) =>
            expect.objectContaining({
              _id: expect.any(String),
              sensor_group_name: group.sensor_group_name,
              sensors: expect.arrayContaining(
                group.sensors.map((sensorItem) =>
                  expect.objectContaining({
                    _id: expect.any(String),
                    sensor_name: sensorItem.sensor_name,
                    location: expect.objectContaining({
                      type: "Point",
                      coordinates: expect.arrayContaining([
                        expect.any(Number),
                        expect.any(Number),
                      ]),
                    }),
                  })
                )
              ),
            })
          )
        ),
      })
    );
  });
});
