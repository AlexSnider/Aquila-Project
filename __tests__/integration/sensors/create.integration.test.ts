import supertest from "supertest";
import app, { initApp, close } from "../../../src/app";
import {
  newInvalidSensorBlankField,
  newInvalidSensorCoordinate,
  newInvalidSensorExistingName,
  newInvalidSensorName,
  newInvalidSensorSchema,
  newSensor,
} from "__tests__/factories/sensor.factories";

const supertestServer = supertest(app);

beforeAll(async () => {
  await initApp();
}, 20000);

afterAll(async () => {
  await close();
});

describe("Sensor Creation", () => {
  it("should create a sensor and return status 201", async () => {
    const sensor = newSensor();
    const result = await supertestServer.post("/sensors").send(sensor);

    expect(result.statusCode).toBe(201);
  });

  it("should fail when coordinates are not an array of two numbers and return status 409", async () => {
    const sensor = newInvalidSensorCoordinate();
    const result = await supertestServer.post("/sensors").send(sensor);

    expect(result.statusCode).toBe(409);
    expect(result.body).toHaveProperty("errors");
  });

  it("should fail when a required field is missing and return status 409", async () => {
    const sensor = newInvalidSensorSchema();
    const result = await supertestServer.post("/sensors").send(sensor);

    expect(result.statusCode).toBe(409);
    expect(result.body).toHaveProperty("errors");
  });

  it("should fail when sensor name is not a string and return status 409", async () => {
    const sensor = newInvalidSensorName();
    const result = await supertestServer.post("/sensors").send(sensor);

    expect(result.statusCode).toBe(409);
    expect(result.body).toHaveProperty("errors");
  });

  it("should fail when sensor has blank fields and return status 409", async () => {
    const sensor = newInvalidSensorBlankField();
    const result = await supertestServer.post("/sensors").send(sensor);

    expect(result.statusCode).toBe(409);
    expect(result.body).toHaveProperty("errors");
  });

  it("should fail when sensor name already exists and return status 409", async () => {
    const sensor = newInvalidSensorExistingName();
    const result = await supertestServer.post("/sensors").send(sensor);

    expect(result.statusCode).toBe(409);
    expect(result.body).toHaveProperty("message");
  });
});
