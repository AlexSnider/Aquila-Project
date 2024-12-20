import SensorSchema from "src/modules/v1/Sensors/schemas/SensorSchema";
import { faker } from "@faker-js/faker";
import { Types } from "mongoose";

const sensor_name = faker.word.sample(6);

export function newSensor() {
  return {
    _id: new Types.ObjectId(),
    sensor_name: sensor_name,
    user_id: faker.string.uuid(),
    location: {
      type: "Point",
      coordinates: [
        faker.number.float().toFixed(4),
        faker.number.float().toFixed(4),
      ],
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export function newRandomSensorId() {
  return new Types.ObjectId();
}

export function newRandomUserId() {
  return faker.string.uuid();
}

export async function newCreateSensor() {
  const sensor = newSensor();
  const sensorDb = await SensorSchema.create(sensor);
  return sensorDb;
}

export function newCreateSensorWithBasicData() {
  const { _id, createdAt, updatedAt, ...sensor } = newSensor();
  return sensor;
}

export function newInvalidSensorCoordinate() {
  return {
    ...newSensor(),
    location: {
      type: "Point",
      coordinates: [
        faker.number.float().toFixed(4),
        faker.number.float().toFixed(4),
        faker.number.float().toFixed(4),
      ],
    },
  };
}

export function newInvalidSensorSchema() {
  const { location, ...sensor } = newSensor();
  return sensor;
}

export function newInvalidSensorName() {
  return { ...newSensor(), sensor_name: faker.number.int().toFixed(4) };
}

export function newInvalidSensorBlankField() {
  return { ...newSensor(), sensor_name: "", user_id: "", location: {} };
}

export function newInvalidSensorExistingName() {
  const { _id, createdAt, updatedAt, ...sensor } = newSensor();
  const sensorEdited = sensor;
  sensorEdited.sensor_name = sensor_name;
  return sensorEdited;
}
