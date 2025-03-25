import { Types } from "mongoose";
import { faker } from "@faker-js/faker";

export function mockSensor() {
  return {
    _id: new Types.ObjectId(),
    user_id: faker.string.uuid(),
    sensor_groups: [
      {
        _id: new Types.ObjectId(),
        sensor_group_name: faker.word.sample(6),
        sensors: [
          {
            _id: new Types.ObjectId(),
            sensor_name: faker.word.sample(6),
            location: {
              type: "Point" as const,
              coordinates: [
                parseFloat(faker.location.longitude().toFixed(6)),
                parseFloat(faker.location.latitude().toFixed(6)),
              ] as [number, number],
            },
          },
        ],
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
