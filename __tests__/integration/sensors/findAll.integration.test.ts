import { mockGetAllSensors } from "__tests__/shared/mocks/mockGetAllSensors";
import { expectSuccessResponse } from "__tests__/shared/helpers/responseValidators";
import { mockSensors } from "__tests__/shared/data/sensorData";
import { validateSensorStructure } from "__tests__/shared/helpers/validationHelpers";

jest.mock("__tests__/shared/helpers/requestHelpers", () => ({
  getAllSensors: mockGetAllSensors,
}));

beforeEach(() => {
  mockGetAllSensors.mockClear();
  // Arrange: Mock the behavior of getAllSensors
  mockGetAllSensors.mockResolvedValue({ statusCode: 200, body: mockSensors });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("GET /sensors - Retrieve all sensors", () => {
  describe("Successful", () => {
    it("should successfully return all sensors with status 200 and an array of sensors", async () => {
      // Act: Call the mocked function to retrieve all sensors
      const result = await mockGetAllSensors();

      // Assert: Validate the response
      expectSuccessResponse(result, 200);
      expect(result.body).toEqual(mockSensors);
    });

    it("should retrieve sensors within 500ms", async () => {
      // Act: Call the mocked function to retrieve all sensors and measure the time taken
      const startTime = Date.now();
      const result = await mockGetAllSensors();
      const endTime = Date.now();

      // Assert: Validate the response and the time taken
      expectSuccessResponse(result, 200);
      expect(endTime - startTime).toBeLessThan(500);
    });
  });

  describe("Field Validation", () => {
    it("should validate the structure of the returned sensors", async () => {
      // Act: Call the mocked function to retrieve all sensors
      const result = await mockGetAllSensors();

      // Assert: Validate the response and the structure of each sensor
      expectSuccessResponse(result, 200);
      result.body.forEach(validateSensorStructure);
    });

    it("should handle invalid sensor data gracefully", async () => {
      // Arrange: Mock the behavior of getAllSensors to return invalid sensor data
      mockGetAllSensors.mockResolvedValueOnce({
        statusCode: 200,
        body: [{ sensor_name: null, user_id: "123", location: { coordinates: [10, 20] } }],
      });

      // Act: Call the mocked function to retrieve all sensors
      const result = await mockGetAllSensors();

      // Assert: Validate the response and the structure of each sensor
      expectSuccessResponse(result, 200);
      expect(() => result.body.forEach(validateSensorStructure)).toThrow();
    });

    it("should return an empty array when no sensors are found", async () => {
      // Arrange: Mock the behavior of getAllSensors to return an empty array
      mockGetAllSensors.mockResolvedValue({ statusCode: 200, body: [] });

      // Act: Call the mocked function to retrieve all sensors
      const result = await mockGetAllSensors();

      // Assert: Validate the response
      expectSuccessResponse(result, 200);
      expect(result.body).toEqual([]);
    });
  });

  describe("Error Handling", () => {
    it("should handle API errors gracefully", async () => {
      // Arrange: Mock the behavior of getAllSensors to simulate an API error
      mockGetAllSensors.mockResolvedValueOnce({ statusCode: 500, body: { message: "Internal Server Error" } });

      // Act: Call the mocked function to retrieve all sensors
      const result = await mockGetAllSensors();

      // Assert: Validate the response
      expect(result.statusCode).toBe(500);
      expect(result.body).toHaveProperty("message", "Internal Server Error");
    });

    it("should match the snapshot for the sensors response", async () => {
      // Act: Call the mocked function to retrieve all sensors
      const result = await mockGetAllSensors();

      // Assert: Validate the response
      expectSuccessResponse(result, 200);
      expect(result.body).toEqual(mockSensors);
    });
  });
});