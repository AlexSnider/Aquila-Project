import supertest from "supertest";
import app from "../../../../src/app";
import {
  newCreateSensor,
  newRandomUserId,
} from "__tests__/integration_factories/sensor.factories";
import { generateSensorsReport } from "src/utils/generateSensorsReport";

const supertestServer = supertest(app);

jest.mock("src/utils/generateSensorsReport", () => ({
  generateSensorsReport: jest.fn(() =>
    Promise.resolve(Buffer.from("PDF_CONTENT"))
  ),
}));

describe("GET /api/v1/sensors/reports/user-id/:id - Retrieve sensor by user ID", () => {
  it("should return 404 when sensor ID is not found", async () => {
    const fakeUserId = newRandomUserId();
    const result = await supertestServer.get(
      `/api/v1/sensors/reports/user-id/${fakeUserId}`
    );

    expect(result.statusCode).toBe(404);
    expect(result.body).toHaveProperty(
      "message",
      "No sensors collections found"
    );
  });

  it("should successfully return a sensor and generate reports and return 200", async () => {
    const newSensor = await newCreateSensor();
    const fakeUserId = newSensor.user_id;
    const result = await supertestServer.get(
      `/api/v1/sensors/reports/user-id/${fakeUserId}`
    );

    expect(result.statusCode).toBe(200);
    expect(result.headers["content-type"]).toBe("application/pdf");
    expect(result.headers["content-disposition"]).toContain("report.pdf");
  });

  it("should return 500 if report generation fails", async () => {
    (generateSensorsReport as jest.Mock).mockRejectedValueOnce(
      new Error("Error generating report")
    );

    const newSensor = await newCreateSensor();
    const fakeUserId = newSensor.user_id;

    const result = await supertestServer.get(
      `/api/v1/sensors/reports/user-id/${fakeUserId}`
    );

    expect(result.statusCode).toBe(500);
    expect(result.body).toHaveProperty("message", "Unexpected error");
  });
});
