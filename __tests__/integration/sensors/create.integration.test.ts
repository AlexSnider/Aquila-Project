import supertest from "supertest";
import app from "../../../src/app";
import {
  newInvalidSensorBlankField,
  newInvalidSensorCoordinate,
  newInvalidSensorExistingName,
  newInvalidSensorName,
  newInvalidSensorSchema,
  newSensor,
} from "__tests__/factories/sensor.factories";

const supertestServer = supertest(app);

describe("POST /sensors - Sensor creation tests", () => {
  it("should return 409 when coordinates are not an array of two numbers", async () => {
    const sensor = newInvalidSensorCoordinate();
    const result = await supertestServer.post("/sensors").send(sensor);

    expect(result.statusCode).toBe(409);
    expect(result.body).toHaveProperty("errors");
  });

  it("should return 409 when a required field is missing", async () => {
    const sensor = newInvalidSensorSchema();
    const result = await supertestServer.post("/sensors").send(sensor);

    expect(result.statusCode).toBe(409);
    expect(result.body).toHaveProperty("errors");
  });

  it("should return 409 when sensor name is not a string", async () => {
    const sensor = newInvalidSensorName();
    const result = await supertestServer.post("/sensors").send(sensor);

    expect(result.statusCode).toBe(409);
    expect(result.body).toHaveProperty("errors");
  });

  it("should return 409 when sensor has blank fields", async () => {
    const sensor = newInvalidSensorBlankField();
    const result = await supertestServer.post("/sensors").send(sensor);

    expect(result.statusCode).toBe(409);
    expect(result.body).toHaveProperty("errors");
  });

  it("should successfully create a sensor and return status 201", async () => {
    const sensor = newSensor();
    const result = await supertestServer.post("/sensors").send(sensor);

    expect(result.statusCode).toBe(201);
    expect(result.body).toHaveProperty("sensor_name");
    expect(result.body).toHaveProperty("user_id");
    expect(result.body).toHaveProperty("coordinates");
    expect(Array.isArray(result.body.coordinates)).toBe(true);
    expect(result.body.coordinates.length).toBe(2);
  });

  it("should return 409 when sensor name already exists", async () => {
    const sensor = newInvalidSensorExistingName();
    const result = await supertestServer.post("/sensors").send(sensor);

    expect(result.statusCode).toBe(409);
    expect(result.body).toHaveProperty("message");
  });
});
