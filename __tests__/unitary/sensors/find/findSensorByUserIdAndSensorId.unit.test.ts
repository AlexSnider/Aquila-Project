import "reflect-metadata";
import { mockSensor } from "__tests__/unitary_factories/sensor.factories";
import {
  sensorRepository,
  findSensorByUserIdAndSensorId,
} from "__tests__/unitary/sensorMocks/services.mock";
import { ServerError } from "src/helpers/errors/apiErrors";

describe("Find Sensors By User Id And Sensor Id", () => {
  it("should return an error if no sensors were found", async () => {
    const userDb = mockSensor();

    jest
      .spyOn(sensorRepository, "findSensorByUserIdAndSensorId")
      .mockResolvedValue([]);

    await expect(
      findSensorByUserIdAndSensorId.execute(
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
      findSensorByUserIdAndSensorId.execute(
        userDb.user_id,
        userDb.sensor_groups[0].sensors[0]._id
      )
    ).rejects.toThrow(new ServerError("The server has encountered an error"));
  });

  it("should return the sensor if it is found", async () => {
    const userDb = mockSensor();
    const expectedSensor = userDb.sensor_groups[0].sensors[0];

    jest
      .spyOn(sensorRepository, "findSensorByUserIdAndSensorId")
      .mockResolvedValue([expectedSensor]);

    const result = await findSensorByUserIdAndSensorId.execute(
      userDb.user_id,
      expectedSensor._id
    );

    expect(result).toEqual([expectedSensor]);

    expect(sensorRepository.findSensorByUserIdAndSensorId).toHaveBeenCalledWith(
      userDb.user_id,
      expectedSensor._id
    );
  });

  it("should return multiple sensors if they exist", async () => {
    const userDb = mockSensor();
    const expectedSensors = [
      userDb.sensor_groups[0].sensors[0],
      userDb.sensor_groups[0].sensors[1],
    ];

    jest
      .spyOn(sensorRepository, "findSensorByUserIdAndSensorId")
      .mockResolvedValue(expectedSensors);

    const result = await findSensorByUserIdAndSensorId.execute(
      userDb.user_id,
      expectedSensors[0]._id
    );

    expect(result).toEqual(expectedSensors);
  });
});
