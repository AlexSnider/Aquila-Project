import "reflect-metadata";
import { mockSensor } from "__tests__/unitary_factories/sensor.factories";
import {
  sensorRepository,
  deleteByUserIdAndSensorIdService,
} from "__tests__/unitary/sensorMocks/services.mock";
import { ServerError } from "src/helpers/errors/apiErrors";

describe("Delete By User Id And Sensor Id", () => {
  it("should return an error if no sensor is found", async () => {
    const userDb = mockSensor();

    jest
      .spyOn(sensorRepository, "findSensorByUserIdAndSensorId")
      .mockResolvedValue([]);

    await expect(
      deleteByUserIdAndSensorIdService.execute(
        userDb.user_id,
        userDb.sensor_groups[0].sensors[0]._id
      )
    ).rejects.toThrow("Sensor not found");
  });

  it("should throw a ServerError if there is an unexpected issue", async () => {
    const userDb = mockSensor();

    jest
      .spyOn(sensorRepository, "findSensorByUserIdAndSensorId")
      .mockRejectedValue(new Error("Database connection error"));

    await expect(
      deleteByUserIdAndSensorIdService.execute(
        userDb.user_id,
        userDb.sensor_groups[0].sensors[0]._id
      )
    ).rejects.toThrow(new ServerError("The server has encountered an error"));
  });

  it("should delete the sensor if it exists", async () => {
    const userDb = mockSensor();

    jest
      .spyOn(sensorRepository, "findSensorByUserIdAndSensorId")
      .mockResolvedValue([userDb.sensor_groups[0].sensors[0]]);

    jest
      .spyOn(sensorRepository, "deleteByUserIdAndSensorId")
      .mockResolvedValue(undefined);

    await expect(
      deleteByUserIdAndSensorIdService.execute(
        userDb.user_id,
        userDb.sensor_groups[0].sensors[0]._id
      )
    ).resolves.toBeUndefined();

    expect(sensorRepository.deleteByUserIdAndSensorId).toHaveBeenCalledWith(
      userDb.user_id,
      userDb.sensor_groups[0].sensors[0]._id
    );
  });
});
