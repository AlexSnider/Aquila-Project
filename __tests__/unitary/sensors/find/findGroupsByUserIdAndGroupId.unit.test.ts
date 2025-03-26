import "reflect-metadata";
import { mockSensor } from "__tests__/unitary_factories/sensor.factories";
import {
  sensorRepository,
  findGroupsByUserIdAndGroupId,
} from "__tests__/unitary/sensorMocks/services.mock";
import { ServerError } from "src/helpers/errors/apiErrors";

describe("Find Groups By User Id And Group Id", () => {
  it("should return an error if no sensor groups were found", async () => {
    const userDb = mockSensor();

    jest
      .spyOn(sensorRepository, "findGroupsByUserIdAndGroupId")
      .mockResolvedValue([]);

    await expect(
      findGroupsByUserIdAndGroupId.execute(
        userDb.user_id,
        userDb.sensor_groups[0]._id
      )
    ).rejects.toThrow("No groups found");
  });

  it("should throw a ServerError if there is an unexpected issue", async () => {
    const userDb = mockSensor();

    jest
      .spyOn(sensorRepository, "findGroupsByUserIdAndGroupId")
      .mockRejectedValue(new Error("Database connection error"));

    await expect(
      findGroupsByUserIdAndGroupId.execute(
        userDb.user_id,
        userDb.sensor_groups[0]._id
      )
    ).rejects.toThrow(new ServerError("The server has encountered an error"));
  });

  it("should return the sensor group if it is found", async () => {
    const userDb = mockSensor();

    jest
      .spyOn(sensorRepository, "findGroupsByUserIdAndGroupId")
      .mockResolvedValue([
        {
          ...userDb,
          sensor_groups: [userDb.sensor_groups[0]],
        },
      ]);

    const result = await findGroupsByUserIdAndGroupId.execute(
      userDb.user_id,
      userDb.sensor_groups[0]._id
    );

    expect(result).toEqual([
      {
        ...userDb,
        sensor_groups: [userDb.sensor_groups[0]],
      },
    ]);

    expect(sensorRepository.findGroupsByUserIdAndGroupId).toHaveBeenCalledWith(
      userDb.user_id,
      userDb.sensor_groups[0]._id
    );
  });

  it("should return multiple sensor groups if they exist", async () => {
    const userDb = mockSensor();
    const expectedGroups = [
      { ...userDb, sensor_groups: [userDb.sensor_groups[0]] },
      { ...userDb, sensor_groups: [userDb.sensor_groups[1]] },
    ];

    jest
      .spyOn(sensorRepository, "findGroupsByUserIdAndGroupId")
      .mockResolvedValue(expectedGroups);

    const result = await findGroupsByUserIdAndGroupId.execute(
      userDb.user_id,
      userDb.sensor_groups[0]._id
    );

    expect(result).toEqual(expectedGroups);
  });
});
