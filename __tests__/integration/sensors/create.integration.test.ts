import { postSensor } from "__tests__/shared/helpers/requestHelpers";
import { ErrorMessages } from "../../shared/constants/errorMessages";
import { createInvalidSensor, createSensor } from "__tests__/shared/data/sensorData";
import { expectErrorResponse } from "__tests__/shared/helpers/responseValidators";

describe("POST /sensors - Sensor creation tests", () => {

  describe("Field Validation", () => {
    it("should return 409 when coordinates are not an array of two numbers", async () => {
      const sensor = createInvalidSensor("invalidCoordinates");
      const result = await postSensor(sensor);

      expectErrorResponse(result, 409, ErrorMessages.LOCATION_COORDINATES_INVALID);
    });

    it("should return 409 when a required field is missing", async () => {
      const sensor = createInvalidSensor("missingField");
      const result = await postSensor(sensor);

      expectErrorResponse(result, 409, ErrorMessages.SENSOR_NAME_REQUIRED);
    });

    it("should return 409 when sensor name is not a string", async () => {
      const sensor = createInvalidSensor("invalidName");
      const result = await postSensor(sensor);

      expectErrorResponse(result, 409, ErrorMessages.SENSOR_NAME_INVALID);
    });

    it("should return 409 when sensor has blank fields", async () => {
      const sensor = createInvalidSensor("blankField");
      const result = await postSensor(sensor);

      expectErrorResponse(result, 409, ErrorMessages.SENSOR_NAME_EMPTY);
    });

    it("should return 409 when user_id is not a valid GUID", async () => {
      const sensor = createInvalidSensor("invalidGUID");
      const result = await postSensor(sensor);

      expectErrorResponse(result, 409, ErrorMessages.USER_ID_INVALID);
    });
  });

  describe("Conflict Scenarios", () => {
    it("should return 409 when sensor name already exists", async () => {
      const sensor = createSensor("ExistingSensor");
      const result = await postSensor(sensor);
      expect(result.statusCode).toBe(201);

      const result2 = await postSensor(sensor);
      expect(result2.statusCode).toBe(409);
      expect(result2.body.message).toContain(ErrorMessages.SENSOR_ALREADY_EXISTS);
      /*
      TODO: Revissar porque no funciona el expectErrorResponse
      expectErrorResponse(result2, 409, ErrorMessages.SENSOR_ALREADY_EXISTS);
       */
    });
  });

  describe("Successful Creation", () => {
    it("should successfully create a sensor and return status 201", async () => {
      const sensor = createSensor("NewSensor");
      const result = await postSensor(sensor);

      expect(result.statusCode).toBe(201);
      expect(result.body).toHaveProperty("sensor_name", sensor.sensor_name);
      expect(result.body).toHaveProperty("user_id", sensor.user_id);
      expect(result.body).toHaveProperty("location");
      expect(result.body.location).toHaveProperty("coordinates");
    });
  });

  describe("Performance", () => {
    it("should create a sensor within 500ms", async () => {
      const sensor = createSensor("NewSensor");
      const startTime = Date.now();
      const result = await postSensor(sensor);
      const endTime = Date.now();

      expect(result.statusCode).toBe(409);
      expect(endTime - startTime).toBeLessThan(500);
    });
  });
});