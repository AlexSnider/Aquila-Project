import "reflect-metadata";
import { CreateService } from "src/modules/v1/Sensors/useCases/create/create.service";
import { mockSensorRepository } from "__tests__/shared/mocks/mockSensorRepository";
import { mockSensorData } from "__tests__/shared/data/sensorData";
import { validateSensorStructure } from "__tests__/shared/helpers/validationHelpers";


describe("Create Sensor", () => {
  let createService: CreateService;

  beforeEach(() => {
    createService = new CreateService(mockSensorRepository);
    jest.clearAllMocks();
  });

  describe("Validation", () => {
    it("should call findByName with the correct sensor name", async () => {
      // Arrange: Mock the behavior of findByName to return null (not found)
      mockSensorRepository.findByName.mockResolvedValueOnce(null);

      // Act: Call the createService with the mock sensor data
      await createService.execute(mockSensorData);

      // Assert: Ensure findByName was called with the correct sensor name
      expect(mockSensorRepository.findByName).toHaveBeenCalledWith(
        mockSensorData.sensor_name
      );
    });
    it("should ensure the location property is correctly structured", async () => {
      // Arrange: Mock the behavior of findByName to return null (not found)
      mockSensorRepository.findByName.mockResolvedValueOnce(null);

      // Act: Call the createService with the mock sensor data
      const result = await createService.execute(mockSensorData);

      // Assert: Validate the structure of the location property
      validateSensorStructure(result);
    });
  });

  describe("Creation", () => {
    it("should create a sensor with the correct properties", async () => {
      // Arrange: Mock the behavior of findByName to return null (not found)
      mockSensorRepository.findByName.mockResolvedValueOnce(null);

      // Act: Call the createService with the mock sensor data
      const result = await createService.execute(mockSensorData);

      // Assert: Validate the properties of the created sensor
      expect(result).toHaveProperty("_id");
      expect(result).toHaveProperty("sensor_name", mockSensorData.sensor_name);
      expect(result).toHaveProperty("user_id", mockSensorData.user_id);
      expect(result).toHaveProperty("location");
      expect(result).toHaveProperty("createdAt");
      expect(result).toHaveProperty("updatedAt");
    });
  });
});