import { mockGetSensorById } from "__tests__/shared/mocks/mockGetSensorById";
import { expectSuccessResponse, expectErrorResponse } from "__tests__/shared/helpers/responseValidators";
import { mockSensorData } from "__tests__/shared/data/sensorData";
import { validateSensorStructure } from "__tests__/shared/helpers/validationHelpers";

jest.mock("__tests__/shared/helpers/requestHelpers", () => ({
  getSensorById: mockGetSensorById,
}));

beforeEach(() => {
  mockGetSensorById.mockClear();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("GET /sensors/:id - Retrieve sensor by ID", () => {
  describe("Successful", () => {
    it("should successfully return a sensor with status 200", async () => {
      // Arrange: Mock the behavior of getSensorById to return a valid sensor
      const sensor = mockSensorData;
      mockGetSensorById.mockResolvedValue({ statusCode: 200, body: sensor });

      // Act: Call the mocked function to retrieve the sensor by ID
      const result = await mockGetSensorById(sensor.user_id);

      // Assert: Validate the response and sensor structure
      expectSuccessResponse(result, 200);
      validateSensorStructure(result.body);
    });
  });

  describe("Error Handling", () => {
    it("should return 404 when sensor ID is not found", async () => {
      // Arrange: Mock the behavior of getSensorById to simulate a 404 error
      const fakeObjectId = "nonexistent-id";
      mockGetSensorById.mockResolvedValue({ statusCode: 404, body: { message: "Sensor not found" } });

      // Act: Call the mocked function to retrieve the sensor by ID
      const result = await mockGetSensorById(fakeObjectId);

      // Assert: Validate the error response
      expectErrorResponse(result, 404, "Sensor not found");
    });
  });
});