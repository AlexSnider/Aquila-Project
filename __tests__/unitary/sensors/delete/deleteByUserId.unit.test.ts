import "reflect-metadata";
import { mockSensor } from "__tests__/unitary_factories/sensor.factories";
import {
  sensorRepository,
  deleteByUserIdService,
} from "__tests__/unitary/sensorMocks/services.mock";
import { ServerError, NotFoundError } from "src/helpers/errors/apiErrors";

describe("Delete By User Id", () => {
  it("should throw a NotFoundError if no sensor collection is found", async () => {
    const userDb = mockSensor();

    jest
      .spyOn(sensorRepository, "findCollectionByUserId")
      .mockResolvedValue([]);

    await expect(deleteByUserIdService.execute(userDb.user_id)).rejects.toThrow(
      new NotFoundError("Sensors collection not found")
    );
  });

  it("should throw a ServerError if there is an unexpected issue", async () => {
    const userDb = mockSensor();

    jest
      .spyOn(sensorRepository, "findCollectionByUserId")
      .mockResolvedValue([userDb]);

    jest
      .spyOn(sensorRepository, "deleteByUserId")
      .mockRejectedValue(new Error("The server has encountered an error"));

    await expect(deleteByUserIdService.execute(userDb.user_id)).rejects.toThrow(
      new ServerError("The server has encountered an error")
    );
  });

  it("should delete the sensor collection if it exists", async () => {
    const userDb = mockSensor();

    jest
      .spyOn(sensorRepository, "findCollectionByUserId")
      .mockResolvedValue([userDb]);

    const spyDelete = jest
      .spyOn(sensorRepository, "deleteByUserId")
      .mockResolvedValue();

    await deleteByUserIdService.execute(userDb.user_id);

    expect(spyDelete).toHaveBeenCalledWith(userDb.user_id);
  });
});
