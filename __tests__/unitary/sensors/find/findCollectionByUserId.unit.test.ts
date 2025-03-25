import "reflect-metadata";
import { mockSensor } from "__tests__/unitary_factories/sensor.factories";
import {
  findCollectionByUserIdService,
  sensorRepository,
} from "__tests__/unitary/sensorMocks/services.mock";
import { ServerError } from "src/helpers/errors/apiErrors";

describe("Find Collection By User Id", () => {
  it("should return an error if sensor collection were not found", async () => {
    const userDb = mockSensor();

    jest
      .spyOn(sensorRepository, "findCollectionByUserId")
      .mockResolvedValue([]);

    await expect(
      findCollectionByUserIdService.execute(userDb.user_id)
    ).rejects.toThrow("No sensors collections found");
  });

  it("should throw a ServerError if there is an unexpected issue", async () => {
    const userDb = mockSensor();

    jest
      .spyOn(sensorRepository, "findCollectionByUserId")
      .mockRejectedValue(new Error("Database connection error"));

    await expect(
      findCollectionByUserIdService.execute(userDb.user_id)
    ).rejects.toThrow(
      new ServerError("The server has encountered an error", expect.any(Error))
    );
  });

  it("should return an array of sensors if they are found", async () => {
    const userDb = mockSensor();

    jest
      .spyOn(sensorRepository, "findCollectionByUserId")
      .mockResolvedValue([userDb]);

    const result = await findCollectionByUserIdService.execute(userDb.user_id);

    expect(result).toEqual([userDb]);
  });
});
