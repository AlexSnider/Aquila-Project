import { faker } from "@faker-js/faker";
import { Types } from "mongoose";
import SensorSchema from "src/modules/v1/Sensors/schemas/SensorSchema";

const user_id = faker.string.uuid();

interface Location {
  type: "Point";
  coordinates: [number, number];
}

interface Sensor {
  sensor_name: string;
  location: Location;
}

interface SensorGroup {
  sensor_group_name: string;
  sensors: Sensor[];
}

interface SensorData {
  user_id: string;
  sensor_groups: SensorGroup[];
}

export function newSensor(): SensorData {
  return {
    user_id: faker.string.uuid(),
    sensor_groups: [
      {
        sensor_group_name: faker.word.sample(6),
        sensors: [
          {
            sensor_name: faker.word.sample(6),
            location: {
              type: "Point",
              coordinates: [
                parseFloat(faker.location.longitude().toFixed(6)),
                parseFloat(faker.location.latitude().toFixed(6)),
              ],
            },
          },
        ],
      },
    ],
  };
}

export async function newCreateSensor() {
  const sensor = { ...newSensor(), user_id: user_id };
  const sensorDb = await SensorSchema.create(sensor);

  return sensorDb;
}

export function newSensorData() {
  return {
    sensor_name: faker.word.sample(6),
    coordinates: {
      type: "Point",
      coordinates: [
        parseFloat(faker.location.longitude().toFixed(6)),
        parseFloat(faker.location.latitude().toFixed(6)),
      ],
    },
  };
}

export function newRandomUserId() {
  return faker.string.uuid();
}

export function newRandomObjectId() {
  return new Types.ObjectId().toString();
}

export function newRandomGroupName() {
  return {
    sensor_group_name: faker.word.sample(6),
  };
}

export function newRandomSensorName() {
  return {
    sensor_name: faker.word.sample(6),
  };
}

export function newRandomSensorUpdateData() {
  return {
    sensor_name: faker.word.sample(6),
    location: {
      type: "Point",
      coordinates: [
        parseFloat(faker.location.longitude().toFixed(6)),
        parseFloat(faker.location.latitude().toFixed(6)),
      ],
    },
  };
}

export function newInvalidUserCollectionAlreadyExists(): SensorData {
  return {
    user_id: user_id,
    sensor_groups: [
      {
        sensor_group_name: faker.word.sample(6),
        sensors: [
          {
            sensor_name: faker.word.sample(6),
            location: {
              type: "Point",
              coordinates: [
                parseFloat(faker.location.longitude().toFixed(6)),
                parseFloat(faker.location.latitude().toFixed(6)),
              ],
            },
          },
        ],
      },
    ],
  };
}

export function newInvalidCoordinates() {
  return {
    ...newSensor(),
    user_id: faker.string.uuid(),
    sensor_groups: [
      {
        sensor_group_name: faker.word.sample(6),
        sensors: [
          {
            sensor_name: faker.word.sample(6),
            location: {
              type: "",
              coordinates: ["invalid", 0],
            },
          },
        ],
      },
    ],
  };
}

export function newInvalidCoordinatesWithInvalidArray() {
  return {
    ...newSensor(),
    user_id: faker.string.uuid(),
    sensor_groups: [
      {
        sensor_group_name: faker.word.sample(6),
        sensors: [
          {
            sensor_name: faker.word.sample(6),
            location: {
              type: "Point",
              coordinates: [10],
            },
          },
        ],
      },
    ],
  };
}

export function newInvalidSensorGroupOrSensorName() {
  return {
    ...newSensor(),
    user_id: faker.string.uuid(),
    sensor_groups: [
      {
        sensor_group_name: 123,
        sensors: [
          {
            sensor_name: "abc",
            location: {
              type: "Point",
              coordinates: [
                parseFloat(faker.location.longitude().toFixed(6)),
                parseFloat(faker.location.latitude().toFixed(6)),
              ],
            },
          },
        ],
      },
    ],
  };
}

export function newInvalidUserId() {
  return {
    ...newSensor(),
    user_id: "invalid",
  };
}

export function newInvalidMissingFields() {
  return {
    ...newSensor(),
    user_id: faker.string.uuid(),
    sensor_groups: [
      {
        sensors: [
          {
            location: {
              type: "Point",
              coordinates: [
                parseFloat(faker.location.longitude().toFixed(6)),
                parseFloat(faker.location.latitude().toFixed(6)),
              ],
            },
          },
        ],
      },
    ],
  };
}

export function newInvalidSensorSchema() {
  return {
    ...newSensor(),
    user_id: faker.word.sample(6),
    sensor_groups: [
      {
        sensor_group_name: faker.word.sample(2),
        sensors: [
          {
            location: {
              type: "invalid",
              coordinates: ["invalid", 100],
            },
          },
        ],
      },
    ],
  };
}

export function newInvalidSensorInsertData() {
  return {
    sensor_name: 123,
    coordinates: {
      type: "invalid",
      coordinates: ["invalid", 100],
    },
  };
}

export function newInvalidSensorUpdateData() {
  return {
    sensor_name: 123,
    location: {
      type: "invalid",
      coordinates: ["invalid", 100],
    },
  };
}
