import supertest from "supertest";
import app, { initApp, close } from "../../../src/app";

const supertestServer = supertest(app);

beforeAll(async () => {
  await initApp();
}, 25000);

afterAll(async () => {
  await close();
});

describe("create", () => {
  it("should create a sensor", async () => {
    const result = await supertestServer.post("/sensors").send({
      sensor_name: "swee",
      user_id: "1",
      coordinates: [34.65, 456.37],
    });

    expect(result.statusCode).toBe(201);
  });

  it("should not create a sensor", async () => {
    const result = await supertestServer.post("/sensors").send({
      sensor_name: "swer",
      user_id: "1",
      coordinates: [34.65, "ersd"],
    });

    expect(result.statusCode).toBe(409);
    expect(result.body).toHaveProperty("errors");
    console.log(result.body);
  });
});
