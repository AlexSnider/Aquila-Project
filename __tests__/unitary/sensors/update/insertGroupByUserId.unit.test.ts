import "reflect-metadata";
import { mockSensor } from "__tests__/unitary_factories/sensor.factories";
import {
  sensorRepository,
  insertGroupByUserIdService,
} from "__tests__/unitary/sensorMocks/services.mock";
import {
  NotFoundError,
  ConflictError,
  ServerError,
} from "src/helpers/errors/apiErrors";

describe("Insert Group By User Id", () => {
  it("should return an error if no sensors collection is found", async () => {
    const userDb = mockSensor();
    const body = {
      user_id: userDb.user_id,
      sensor_groups: [{ sensor_group_name: "New Group" }],
    };

    jest
      .spyOn(sensorRepository, "findCollectionByUserId")
      .mockResolvedValue([]);

    await expect(insertGroupByUserIdService.execute(body)).rejects.toThrow(
      new NotFoundError("Sensors collection not found")
    );
  });

  it("should return a conflict error if the group already exists", async () => {
    const userDb = mockSensor();
    const body = {
      user_id: userDb.user_id,
      sensor_groups: [
        { sensor_group_name: userDb.sensor_groups[0].sensor_group_name },
      ],
    };

    jest
      .spyOn(sensorRepository, "findCollectionByUserId")
      .mockResolvedValue([userDb]);

    jest.spyOn(sensorRepository, "groupNameExists").mockResolvedValue(true);

    await expect(insertGroupByUserIdService.execute(body)).rejects.toThrow(
      new ConflictError("Group already exists")
    );
  });

  it("should throw a ServerError if there is an unexpected issue", async () => {
    const userDb = mockSensor();
    const body = {
      user_id: userDb.user_id,
      sensor_groups: [{ sensor_group_name: "New Group" }],
    };

    jest
      .spyOn(sensorRepository, "findCollectionByUserId")
      .mockResolvedValue([userDb]);

    jest.spyOn(sensorRepository, "groupNameExists").mockResolvedValue(false);

    jest
      .spyOn(sensorRepository, "insertGroupByUserId")
      .mockRejectedValue(new Error("Database connection error"));

    await expect(insertGroupByUserIdService.execute(body)).rejects.toThrow(
      new ServerError("The server has encountered an error")
    );
  });

  it("should insert the group if no errors occur", async () => {
    const userDb = mockSensor();
    const body = {
      user_id: userDb.user_id,
      sensor_groups: [{ sensor_group_name: "New Group" }],
    };

    jest
      .spyOn(sensorRepository, "findCollectionByUserId")
      .mockResolvedValue([userDb]);

    jest.spyOn(sensorRepository, "groupNameExists").mockResolvedValue(false);

    jest
      .spyOn(sensorRepository, "insertGroupByUserId")
      .mockResolvedValue(undefined);

    await expect(
      insertGroupByUserIdService.execute(body)
    ).resolves.toBeUndefined();

    expect(sensorRepository.insertGroupByUserId).toHaveBeenCalledWith(
      body.user_id,
      body.sensor_groups[0].sensor_group_name
    );
  });
});
