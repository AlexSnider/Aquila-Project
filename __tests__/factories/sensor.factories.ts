import SensorSchema from "src/modules/v1/Sensors/schemas/SensorSchema";
import { faker } from "@faker-js/faker";
import { Types } from "mongoose";

const sensor_name = faker.word.sample(6);

export function newSensor() {
  return {
    _id: new Types.ObjectId(),
    sensor_name: sensor_name,
    user_id: faker.string.uuid(),
    coordinates: [
      Number(faker.number.float().toFixed(4)),
      Number(faker.number.float().toFixed(4)),
    ] as [Number, Number],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export function newRandomSensorId() {
  return new Types.ObjectId();
}

export async function newCreateSensor() {
  const sensor = newSensor();
  const sensorDb = await SensorSchema.create(sensor);
  return sensorDb;
}

export function newInvalidSensorCoordinate() {
  return {
    ...newSensor(),
    coordinates: [faker.number.float().toFixed(4), faker.word.sample(5)],
  };
}

export function newInvalidSensorSchema() {
  const { coordinates, ...sensor } = newSensor();
  return sensor;
}

export function newInvalidSensorName() {
  return { ...newSensor(), sensor_name: faker.number.int().toFixed(4) };
}

export function newInvalidSensorBlankField() {
  return { ...newSensor(), sensor_name: "", user_id: "", coordinates: [] };
}

export function newInvalidSensorExistingName() {
  return { ...newSensor(), sensor_name: sensor_name };
}
