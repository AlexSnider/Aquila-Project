import supertest from "supertest";
import app, { initApp, close } from "../../app";

const supertestServer = supertest(app);

beforeAll(async () => {
  await initApp();
}, 20000);

afterAll(async () => {
  await close();
});

describe("Create Sensor", () => {
  it("Should create a sensor and return status code 201", async () => {
    const result = await supertestServer.post("/sensors").send({
      sensor_name: "test",
      user_id: "1",
      coordinates: [6534.65, 2456.37],
    });

    expect(result.statusCode).toBe(201);
  });

  it("should not create a sensor. Coordinates must be an array of two numbers and return status code 409", async () => {
    const result = await supertestServer.post("/sensors").send({
      sensor_name: "test",
      user_id: "1",
      coordinates: [34.65, "test"],
    });

    expect(result.statusCode).toBe(409);
    expect(result.body).toHaveProperty("errors");
  });

  it("Should not create a sensor. Missing coordinates and return status code 409", async () => {
    const result = await supertestServer.post("/sensors").send({
      sensor_name: "test",
      user_id: "1",
    });

    expect(result.statusCode).toBe(409);
    expect(result.body).toHaveProperty("errors");
  });

  it("Should not create a sensor. Missing user id and return status code 409", async () => {
    const result = await supertestServer.post("/sensors").send({
      sensor_name: "test",
      coordinates: [34.65, 34.65],
    });

    expect(result.statusCode).toBe(409);
    expect(result.body).toHaveProperty("errors");
  });

  it("Should not create a sensor. Missing sensor name and return status code 409", async () => {
    const result = await supertestServer.post("/sensors").send({
      user_id: "1",
      coordinates: [34.65, 34.65],
    });

    expect(result.statusCode).toBe(409);
    expect(result.body).toHaveProperty("errors");
  });

  it("Should not create a sensor. Sensor name already exists and return status code 409", async () => {
    const result = await supertestServer.post("/sensors").send({
      sensor_name: "test",
      user_id: "1",
      coordinates: [34.65, 34.65],
    });

    expect(result.statusCode).toBe(409);
    expect(result.body).toHaveProperty("message");
  });

  it("Should not create a sensor. Sensor name must be a string and return status code 409", async () => {
    const result = await supertestServer.post("/sensors").send({
      sensor_name: 0o12,
      user_id: "1",
      coordinates: [34.65, 34.65],
    });

    expect(result.statusCode).toBe(409);
    expect(result.body).toHaveProperty("errors");
  });

  it("Should not create a sensor. User ID must be a string and return status code 409", async () => {
    const result = await supertestServer.post("/sensors").send({
      sensor_name: "test",
      user_id: 0o12,
      coordinates: [34.65, 34.65],
    });

    expect(result.statusCode).toBe(409);
    expect(result.body).toHaveProperty("errors");
  });

  it("Should not create a sensor. Coordinates cannot have null values and return status code 409", async () => {
    const result = await supertestServer.post("/sensors").send({
      sensor_name: "test2",
      user_id: "1",
      coordinates: [34.65, null],
    });

    expect(result.statusCode).toBe(409);
    expect(result.body).toHaveProperty("errors");
  });

  it("Should not create a sensor. Coordinates cannot have undefined values and return status code 409", async () => {
    const result = await supertestServer.post("/sensors").send({
      sensor_name: "test2",
      user_id: "1",
      coordinates: [34.65, undefined],
    });

    expect(result.statusCode).toBe(409);
    expect(result.body).toHaveProperty("errors");
  });
});
