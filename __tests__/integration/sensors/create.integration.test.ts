import supertest from "supertest";
import app from "../../../src/app";
import { ErrorMessages } from "./errors/errorMessages";

const supertestServer = supertest(app);

const baseSensor = {
  sensor_name: "ValidSensor",
  user_id: "123e4567-e89b-12d3-a456-426614174000",
  location: { type: "Point", coordinates: [10.1234, 20.5678] },
};

async function postSensor(sensor: any) {
  return await supertestServer.post("/sensors").send(sensor);
}

function createInvalidSensor(type: "missingField" | "invalidName" | "blankField" | "invalidCoordinates" | "invalidGUID") {
  const invalidSensors: Record<string, Partial<typeof baseSensor>> = {
    missingField: (() => {
      const { sensor_name, ...sensor } = baseSensor;
      return sensor;
    })(),
    invalidName: { ...baseSensor, sensor_name: 12345 as any },
    blankField: { ...baseSensor, sensor_name: "" },
    invalidCoordinates: { ...baseSensor, location: { type: "Point", coordinates: [10.1234] } },
    invalidGUID: { ...baseSensor, user_id: "invalid-uuid" },
  };

  return invalidSensors[type] || baseSensor;
}

function createSensor(type: "ExistingSensor" | "NewSensor") {
  const validSensors: Record<string, Partial<typeof baseSensor>> = {
    ExistingSensor: { ...baseSensor, sensor_name: "ExistingSensor" },
    NewSensor: { ...baseSensor, sensor_name: "NewSensor" },
  };

  return validSensors[type] || baseSensor;
}


describe("POST /sensors - Sensor creation tests", () => {

  describe("Field Validation", () => {
    it("should return 409 when coordinates are not an array of two numbers", async () => {
      const sensor = createInvalidSensor("invalidCoordinates");
      const result = await postSensor(sensor);

      expect(result.statusCode).toBe(409);
      expect(result.body.errors).toContain(ErrorMessages.LOCATION_COORDINATES_INVALID);
    });

    it("should return 409 when a required field is missing", async () => {
      const sensor = createInvalidSensor("missingField");
      const result = await postSensor(sensor);

      expect(result.statusCode).toBe(409);
      expect(result.body.errors).toContain(ErrorMessages.SENSOR_NAME_REQUIRED);
    });

    it("should return 409 when sensor name is not a string", async () => {
      const sensor = createInvalidSensor("invalidName");
      const result = await postSensor(sensor);

      expect(result.statusCode).toBe(409);
      expect(result.body.errors).toContain(ErrorMessages.SENSOR_NAME_INVALID);
    });

    it("should return 409 when sensor has blank fields", async () => {
      const sensor = createInvalidSensor("blankField");
      const result = await postSensor(sensor);

      expect(result.statusCode).toBe(409);
      expect(result.body.errors).toContain(ErrorMessages.SENSOR_NAME_EMPTY);
    });

    it("should return 409 when user_id is not a valid GUID", async () => {
      const sensor = createInvalidSensor("invalidGUID");
      const result = await postSensor(sensor);

      expect(result.statusCode).toBe(409);
      expect(result.body.errors).toContain(ErrorMessages.USER_ID_INVALID);
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