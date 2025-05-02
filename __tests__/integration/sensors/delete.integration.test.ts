import { mockDeleteSensor } from "__tests__/shared/mocks/mockDeleteSensor";
import { expectErrorResponse } from "__tests__/shared/helpers/responseValidators";
import { mockSensorData } from "__tests__/shared/data/sensorData";

jest.mock("__tests__/shared/helpers/requestHelpers", () => ({
  deleteSensor: mockDeleteSensor,
}));

beforeEach(() => {
  mockDeleteSensor.mockClear();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("DELETE /sensors/delete/:sensor_name - Delete a sensor by Name", () => {
  describe("Successful", () => {
    it("should successfully delete a sensor and return status 204", async () => {
      // Arrange: Mock the behavior of deleteSensor to simulate successful deletion
      const sensor = mockSensorData;
      mockDeleteSensor.mockResolvedValue({ statusCode: 204 });

      // Act: Call the mocked function to delete the sensor by Name
      const result = await mockDeleteSensor(sensor.sensor_name);
      console.log(result);

      // Assert: Validate the response
      expect(result.statusCode).toBe(204);
    });
  });

  describe("Error Handling", () => {
    it("should return 404 when attempting to delete a non-existent sensor", async () => {
      // Arrange: Mock the behavior of deleteSensor to simulate a 404 error
      const fakeObjectName = "nonexistent-Name";
      mockDeleteSensor.mockResolvedValue({ statusCode: 404, body: { message: "Sensor not found" } });

      // Act: Call the mocked function to delete the sensor by Name
      const result = await mockDeleteSensor(fakeObjectName);

      // Assert: Validate the error response
      expectErrorResponse(result, 404, "Sensor not found");
    });
  });
});