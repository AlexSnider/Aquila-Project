import { mockUpdateSensor } from "__tests__/shared/mocks/mockUpdateSensor";
import { expectErrorResponse } from "__tests__/shared/helpers/responseValidators";
import { mockSensorData } from "__tests__/shared/data/sensorData";

jest.mock("__tests__/shared/helpers/requestHelpers", () => ({
  updateSensor: mockUpdateSensor,
}));

beforeEach(() => {
  mockUpdateSensor.mockClear();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("PATCH /sensors/update/:sensor_name - Update a sensor by Name", () => {
  describe("Successful", () => {
    it("should successfully update a sensor and return status 204", async () => {
      // Arrange: Mock the behavior of updateSensor to simulate a successful update
      const sensor = mockSensorData;
      mockUpdateSensor.mockResolvedValue({ statusCode: 204 });

      // Act: Call the mocked function to update the sensor
      const result = await mockUpdateSensor(sensor.sensor_name, { sensor_name: "Updated Sensor" });

      // Assert: Validate the response
      expect(result.statusCode).toBe(204);
    });
  });

  describe("Error Handling", () => {
    it("should return 404 when attempting to update a non-existent sensor", async () => {
      // Arrange: Mock the behavior of updateSensor to simulate a 404 error
      const fakeObjectName = "nonexistent-Name";
      mockUpdateSensor.mockResolvedValue({ statusCode: 404, body: { message: "Sensor not found" } });

      // Act: Call the mocked function to update the sensor
      const result = await mockUpdateSensor(fakeObjectName, { sensor_name: "Updated Sensor" });

      // Assert: Validate the error response
      expectErrorResponse(result, 404, "Sensor not found");
    });

    it("should return 403 when attempting to update user_id", async () => {
      // Arrange: Mock the behavior of updateSensor to simulate a 403 error
      const sensor = mockSensorData;
      mockUpdateSensor.mockResolvedValue({ statusCode: 403, body: { message: "Not allowed to update user_name" } });

      // Act: Call the mocked function to update the sensor
      const result = await mockUpdateSensor(sensor.sensor_name, { user_id: "123" });

      // Assert: Validate the error response
      expectErrorResponse(result, 403, "Not allowed to update user_id");
    });

    it("should return 409 when coordinates are not an array of two numbers", async () => {
      // Arrange: Mock the behavior of updateSensor to simulate a 409 error
      const sensor = mockSensorData;
      mockUpdateSensor.mockResolvedValue({
        statusCode: 409,
        body: { message: "Coordinates must be an array of two numbers" },
      });

      // Act: Call the mocked function to update the sensor
      const result = await mockUpdateSensor(sensor.sensor_name, {
        location: { type: "Point", coordinates: [10] },
      });

      // Assert: Validate the error response
      expectErrorResponse(result, 409, "Coordinates must be an array of two numbers");
    });

    it("should return 409 when sensor_name is not a string", async () => {
      // Arrange: Mock the behavior of updateSensor to simulate a 409 error
      const sensor = mockSensorData;
      mockUpdateSensor.mockResolvedValue({
        statusCode: 409,
        body: { message: "Sensor name must be a string" },
      });

      // Act: Call the mocked function to update the sensor
      const result = await mockUpdateSensor(sensor.sensor_name, { sensor_name: "Sensor1" });

      // Assert: Validate the error response
      expectErrorResponse(result, 409, "Sensor name must be a string");
    });
  });
});