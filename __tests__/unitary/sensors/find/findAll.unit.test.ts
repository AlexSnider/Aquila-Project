import "reflect-metadata";
import { NotFoundError, ServerError } from "src/helpers/errors/apiErrors";
import { mockSensor } from "__tests__/unitary_factories/sensor.factories";
import {
  findAllSensorsService,
  sensorRepository,
} from "__tests__/unitary/sensorMocks/services.mock";

describe("Find All Sensors Service - Unit Tests", () => {
  const limit = 10;
  const offset = 0;
  it("should throw NotFoundError if no sensors are found", async () => {
    jest.spyOn(sensorRepository, "findAll").mockResolvedValue([]);

    await expect(findAllSensorsService.execute(limit, offset)).rejects.toThrow(
      new NotFoundError("No sensors collections found")
    );
  });

  it("should throw ServerError if an unexpected error occurs", async () => {
    jest
      .spyOn(sensorRepository, "findAll")
      .mockRejectedValue(new Error("The server has encountered an error"));

    await expect(findAllSensorsService.execute(limit, offset)).rejects.toThrow(
      new ServerError("The server has encountered an error")
    );
  });
  it("should return sensors if found", async () => {
    const userDb = [mockSensor(), mockSensor()];
    jest.spyOn(sensorRepository, "findAll").mockResolvedValue(userDb);

    const result = await findAllSensorsService.execute(limit, offset);

    expect(result).toEqual(userDb);
  });
});
