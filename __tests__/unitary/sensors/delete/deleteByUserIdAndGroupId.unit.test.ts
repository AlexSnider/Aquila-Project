import "reflect-metadata";
import { mockSensor } from "__tests__/unitary_factories/sensor.factories";
import {
  sensorRepository,
  deleteByUserIdAndGroupIdService,
} from "__tests__/unitary/sensorMocks/services.mock";
import { ServerError } from "src/helpers/errors/apiErrors";

describe("Delete By User Id And Group Id", () => {
  it("should return an error if no sensor groups are found to delete", async () => {
    const userDb = mockSensor();

    jest
      .spyOn(sensorRepository, "findGroupsByUserIdAndGroupId")
      .mockResolvedValue([]);

    await expect(
      deleteByUserIdAndGroupIdService.execute(
        userDb.user_id,
        userDb.sensor_groups[0]._id
      )
    ).rejects.toThrow("Group not found");
  });

  it("should throw a ServerError if there is an unexpected issue", async () => {
    const userDb = mockSensor();

    jest
      .spyOn(sensorRepository, "findGroupsByUserIdAndGroupId")
      .mockRejectedValue(new Error("The server has encountered an error"));

    await expect(
      deleteByUserIdAndGroupIdService.execute(
        userDb.user_id,
        userDb.sensor_groups[0]._id
      )
    ).rejects.toThrow(new ServerError("The server has encountered an error"));
  });

  it("should delete the sensor group if it exists", async () => {
    const userDb = mockSensor();

    jest
      .spyOn(sensorRepository, "findGroupsByUserIdAndGroupId")
      .mockResolvedValue([
        {
          ...userDb,
          sensor_groups: [userDb.sensor_groups[0]],
        },
      ]);

    jest
      .spyOn(sensorRepository, "deleteByUserIdAndGroupId")
      .mockResolvedValue(undefined);

    await expect(
      deleteByUserIdAndGroupIdService.execute(
        userDb.user_id,
        userDb.sensor_groups[0]._id
      )
    ).resolves.toBeUndefined();

    expect(sensorRepository.deleteByUserIdAndGroupId).toHaveBeenCalledWith(
      userDb.user_id,
      userDb.sensor_groups[0]._id
    );
  });
});
