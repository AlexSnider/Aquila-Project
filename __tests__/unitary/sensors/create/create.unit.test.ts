import "reflect-metadata";
import { ServerError } from "src/helpers/errors/apiErrors";
import { mockSensor } from "__tests__/unitary_factories/sensor.factories";
import {
  createNewSensorService,
  sensorRepository,
} from "__tests__/unitary/sensorMocks/services.mock";

describe("Create Sensor Service - Unit Tests", () => {
  it("should throw an error if the sensor already exists", async () => {
    const userDb = mockSensor();

    jest
      .spyOn(sensorRepository, "findCollectionByUserId")
      .mockResolvedValue([userDb]);

    await expect(createNewSensorService.execute(userDb)).rejects.toThrow(
      "Sensor collection already exists"
    );
  });

  it("should throw a ServerError if the sensor creation fails", async () => {
    const userDb = mockSensor();

    jest
      .spyOn(sensorRepository, "findCollectionByUserId")
      .mockResolvedValue([]);

    jest
      .spyOn(sensorRepository, "create")
      .mockRejectedValue(new Error("The server has encountered an error"));

    await expect(createNewSensorService.execute(userDb)).rejects.toThrow(
      new ServerError("The server has encountered an error")
    );
  });
  it("should create a sensor if no existing collection is found", async () => {
    const userDb = mockSensor();

    jest
      .spyOn(sensorRepository, "findCollectionByUserId")
      .mockResolvedValue([]);

    const spyCreate = jest
      .spyOn(sensorRepository, "create")
      .mockResolvedValue(userDb);

    const result = await createNewSensorService.execute(userDb);

    expect(spyCreate).toHaveBeenCalled();
    expect(result).toEqual(userDb);
  });
});
