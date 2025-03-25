import "reflect-metadata";
import { mockSensor } from "__tests__/unitary_factories/sensor.factories";
import {
  sensorRepository,
  updateGroupNameByUserIdService,
} from "__tests__/unitary/sensorMocks/services.mock";
import { NotFoundError, ServerError } from "src/helpers/errors/apiErrors";

describe("Update Group Name By User Id and Group Id", () => {
  it("should return an error if the group does not exist", async () => {
    const userDb = mockSensor();

    jest
      .spyOn(sensorRepository, "findGroupsByUserIdAndGroupId")
      .mockResolvedValue([]);

    const body = {
      user_id: userDb.user_id,
      sensor_groups: [
        {
          _id: userDb.sensor_groups[0]._id,
          sensor_group_name: "New Group Name",
        },
      ],
    };

    await expect(updateGroupNameByUserIdService.execute(body)).rejects.toThrow(
      new NotFoundError("Group not found")
    );
  });

  it("should throw a ServerError if there is an unexpected issue", async () => {
    const userDb = mockSensor();

    jest
      .spyOn(sensorRepository, "findGroupsByUserIdAndGroupId")
      .mockRejectedValue(new Error("Database connection error"));

    const body = {
      user_id: userDb.user_id,
      sensor_groups: [
        {
          _id: userDb.sensor_groups[0]._id,
          sensor_group_name: "New Group Name",
        },
      ],
    };

    await expect(updateGroupNameByUserIdService.execute(body)).rejects.toThrow(
      new ServerError("The server has encountered an error")
    );
  });

  it("should successfully update the group name if the group exists", async () => {
    const userDb = mockSensor();

    jest
      .spyOn(sensorRepository, "findGroupsByUserIdAndGroupId")
      .mockResolvedValue([userDb]);

    jest
      .spyOn(sensorRepository, "updateGroupName")
      .mockResolvedValue(undefined);

    const body = {
      user_id: userDb.user_id,
      sensor_groups: [
        {
          _id: userDb.sensor_groups[0]._id,
          sensor_group_name: "Updated Group Name",
        },
      ],
    };

    await expect(
      updateGroupNameByUserIdService.execute(body)
    ).resolves.toBeUndefined();

    expect(sensorRepository.updateGroupName).toHaveBeenCalledWith(
      body.user_id,
      userDb.sensor_groups[0]._id,
      "Updated Group Name"
    );
  });
});
