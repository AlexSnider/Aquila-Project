import supertest from "supertest";
import app from "../../../src/app";
import { newCreateSensor } from "__tests__/factories/sensor.factories";

const supertestServer = supertest(app);

describe("GET /sensors - Retrieve all sensors", () => {
  it("should successfully return all sensors with status 200 and an array of sensors", async () => {
    await newCreateSensor();

    const result = await supertestServer.get("/sensors");

    console.log("Response:", result.body); // Log the response body for debugging

    expect(result.statusCode).toBe(200);
    expect(result.body).toBeInstanceOf(Array);
  });
});
