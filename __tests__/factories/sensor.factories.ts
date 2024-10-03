import { faker } from "@faker-js/faker";

export function newSensor() {
  return {
    sensor_name: "test",
    user_id: faker.number.hex({ min: 10, max: 15 }),
    coordinates: [
      faker.number.float({ min: 4, max: 6 }),
      faker.number.float({ min: 4, max: 6 }),
    ],
  };
}

export function newInvalidSensorCoordinate() {
  return { ...newSensor(), coordinates: [34.65, faker.word.sample(4) || null] };
}

export function newInvalidSensorSchema() {
  const { coordinates, ...sensor } = newSensor();
  return sensor;
}

export function newInvalidSensorName() {
  return { ...newSensor(), sensor_name: faker.number.int({ min: 5, max: 6 }) };
}

export function newInvalidSensorBlankField() {
  return { ...newSensor(), sensor_name: "", user_id: "", coordinates: [] };
}

export function newInvalidSensorExistingName() {
  return { ...newSensor(), sensor_name: "test" };
}
