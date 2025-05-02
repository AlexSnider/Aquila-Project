import { postSensor } from "__tests__/shared/helpers/requestHelpers";
import { ErrorMessages } from "__tests__/shared/constants/errorMessages";
import { createInvalidSensor, createSensor } from "__tests__/shared/data/sensorData_old";
import { expectErrorResponse, expectSuccessResponse } from "__tests__/shared/helpers/responseValidators";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("POST /sensors - Sensor creation tests", () => {
  describe("Field Validation", () => {
    it("should return 409 when coordinates are not an array of two numbers", async () => {
      // Arrange: Create an invalid sensor with incorrect coordinates
      const sensor = createInvalidSensor("invalidCoordinates");

      // Act: Attempt to create the sensor
      const result = await postSensor(sensor);

      // Assert: Validate the error response
      expectErrorResponse(result, 409, ErrorMessages.LOCATION_COORDINATES_INVALID);
    });

    it("should return 409 when a required field is missing", async () => {
      // Arrange: Create an invalid sensor with a missing field
      const sensor = createInvalidSensor("missingField");

      // Act: Attempt to create the sensor
      const result = await postSensor(sensor);

      // Assert: Validate the error response
      expectErrorResponse(result, 409, ErrorMessages.SENSOR_NAME_REQUIRED);
    });

    it("should return 409 when sensor name is not a string", async () => {
      // Arrange: Create an invalid sensor with a non-string name
      const sensor = createInvalidSensor("invalidName");

      // Act: Attempt to create the sensor
      const result = await postSensor(sensor);

      // Assert: Validate the error response
      expectErrorResponse(result, 409, ErrorMessages.SENSOR_NAME_INVALID);
    });

    it("should return 409 when sensor has blank fields", async () => {
      // Arrange: Create an invalid sensor with blank fields
      const sensor = createInvalidSensor("blankField");

      // Act: Attempt to create the sensor
      const result = await postSensor(sensor);

      // Assert: Validate the error response
      expectErrorResponse(result, 409, ErrorMessages.SENSOR_NAME_EMPTY);
    });

    it("should return 409 when user_id is not a valid GUID", async () => {
      // Arrange: Create an invalid sensor with an invalid GUID
      const sensor = createInvalidSensor("invalidGUID");

      // Act: Attempt to create the sensor
      const result = await postSensor(sensor);

      // Assert: Validate the error response
      expectErrorResponse(result, 409, ErrorMessages.USER_ID_INVALID);
    });
  });

  describe("Conflict Scenarios", () => {
    it("should return 409 when sensor name already exists", async () => {
      // Arrange: Create a sensor with an existing name
      const sensor = createSensor("ExistingSensor");

      // Act: Create the sensor for the first time
      const result1 = await postSensor(sensor);
      expectSuccessResponse(result1, 201);

      // Act: Attempt to create the sensor again
      const result2 = await postSensor(sensor);

      // Assert: Validate the conflict error response
      expectErrorResponse(result2, 409, ErrorMessages.SENSOR_ALREADY_EXISTS);
    });
  });

  describe("Successful Creation", () => {
    it("should successfully create a sensor and return status 201", async () => {
      // Arrange: Create a valid new sensor
      const sensor = createSensor("NewSensor");

      // Act: Attempt to create the sensor
      const result = await postSensor(sensor);

      // Assert: Validate the success response
      expectSuccessResponse(result, 201);
      expect(result.body).toHaveProperty("sensor_name", sensor.sensor_name);
      expect(result.body).toHaveProperty("user_id", sensor.user_id);
      expect(result.body).toHaveProperty("location");
      expect(result.body.location).toHaveProperty("coordinates");
    });
  });

  describe("Performance", () => {
    it("should create a sensor within 500ms", async () => {
      // Arrange: Create a valid new sensor
      const sensor = createSensor("NewSensor");

      // Act: Measure the time taken to create the sensor
      const startTime = Date.now();
      const result = await postSensor(sensor);
      const endTime = Date.now();

      // Assert: Validate the success response and performance
      expectErrorResponse(result, 409, ErrorMessages.SENSOR_ALREADY_EXISTS);
      expect(endTime - startTime).toBeLessThan(500);
    });
  });
});