import "reflect-metadata";
import { mockSensor } from "__tests__/unitary_factories/sensor.factories";
import {
  sensorRepository,
  insertSensorByUserIdService,
} from "__tests__/unitary/sensorMocks/services.mock";
import {
  NotFoundError,
  ConflictError,
  ServerError,
} from "src/helpers/errors/apiErrors";

describe("Insert Sensor By User Id", () => {
  it("should return an error if no group is found", async () => {
    const userDb = mockSensor();
    const body = {
      user_id: userDb.user_id,
      groupIdObject: userDb.sensor_groups[0]._id,
      sensor_name: "New Sensor",
      coordinates: { coordinates: [10, 20] as [number, number] },
    };

    jest
      .spyOn(sensorRepository, "findGroupsByUserIdAndGroupId")
      .mockResolvedValue([]);

    await expect(insertSensorByUserIdService.execute(body)).rejects.toThrow(
      new NotFoundError("Group not found")
    );
  });

  it("should return a conflict error if the sensor name already exists", async () => {
    const userDb = mockSensor();
    const body = {
      user_id: userDb.user_id,
      groupIdObject: userDb.sensor_groups[0]._id,
      sensor_name: userDb.sensor_groups[0].sensors[0].sensor_name,
      coordinates: { coordinates: [10, 20] as [number, number] },
    };

    jest
      .spyOn(sensorRepository, "findGroupsByUserIdAndGroupId")
      .mockResolvedValue([userDb]);

    jest.spyOn(sensorRepository, "sensorNameExists").mockResolvedValue(true);

    await expect(insertSensorByUserIdService.execute(body)).rejects.toThrow(
      new ConflictError("Sensor name already exists")
    );
  });

  it("should throw a ServerError if there is an unexpected issue", async () => {
    const userDb = mockSensor();
    const body = {
      user_id: userDb.user_id,
      groupIdObject: userDb.sensor_groups[0]._id,
      sensor_name: "New Sensor",
      coordinates: { coordinates: [10, 20] as [number, number] },
    };

    jest
      .spyOn(sensorRepository, "findGroupsByUserIdAndGroupId")
      .mockResolvedValue([userDb]);

    jest.spyOn(sensorRepository, "sensorNameExists").mockResolvedValue(false);

    jest
      .spyOn(sensorRepository, "insertSensorData")
      .mockRejectedValue(new Error("Database connection error"));

    await expect(insertSensorByUserIdService.execute(body)).rejects.toThrow(
      new ServerError("The server has encountered an error")
    );
  });

  it("should insert the sensor if no errors occur", async () => {
    const userDb = mockSensor();
    const body = {
      user_id: userDb.user_id,
      groupIdObject: userDb.sensor_groups[0]._id,
      sensor_name: "New Sensor",
      coordinates: { coordinates: [10, 20] as [number, number] },
    };

    jest
      .spyOn(sensorRepository, "findGroupsByUserIdAndGroupId")
      .mockResolvedValue([userDb]);

    jest.spyOn(sensorRepository, "sensorNameExists").mockResolvedValue(false);

    jest
      .spyOn(sensorRepository, "insertSensorData")
      .mockResolvedValue(undefined);

    await expect(
      insertSensorByUserIdService.execute(body)
    ).resolves.toBeUndefined();

    expect(sensorRepository.insertSensorData).toHaveBeenCalledWith(
      body.user_id,
      body.groupIdObject,
      body.sensor_name,
      body.coordinates
    );
  });
});
