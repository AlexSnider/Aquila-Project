import "reflect-metadata";
import { mockSensor } from "__tests__/unitary_factories/sensor.factories";
import {
  sensorRepository,
  updateSensorDataByUserIdService,
} from "__tests__/unitary/sensorMocks/services.mock";
import { NotFoundError, ServerError } from "src/helpers/errors/apiErrors";
import { Types } from "mongoose";

describe("Update Sensor Data By User Id and Sensor Id", () => {
  it("should return an error if the sensor does not exist", async () => {
    const userDb = mockSensor();

    jest
      .spyOn(sensorRepository, "findSensorByUserIdAndSensorId")
      .mockResolvedValue([]);

    const body = {
      user_id: userDb.user_id,
      sensor_groups: [
        {
          _id: userDb.sensor_groups[0]._id,
          sensors: [
            {
              _id: new Types.ObjectId(),
              sensor_name: "New Sensor Name",
              location: {
                type: "Point",
                coordinates: [10, 20] as [number, number],
              },
            },
          ],
        },
      ],
    };

    await expect(updateSensorDataByUserIdService.execute(body)).rejects.toThrow(
      new NotFoundError("Sensor not found")
    );
  });

  it("should throw a ServerError if there is an unexpected issue", async () => {
    const userDb = mockSensor();

    jest
      .spyOn(sensorRepository, "findSensorByUserIdAndSensorId")
      .mockResolvedValue([userDb.sensor_groups[0].sensors[0]]);

    jest
      .spyOn(sensorRepository, "updateSensorData")
      .mockRejectedValue(new Error("Database connection error"));

    const body = {
      user_id: userDb.user_id,
      sensor_groups: [
        {
          _id: userDb.sensor_groups[0]._id,
          sensors: [
            {
              _id: userDb.sensor_groups[0].sensors[0]._id,
              sensor_name: "New Sensor Name",
              location: {
                type: "Point",
                coordinates: [10, 20] as [number, number],
              },
            },
          ],
        },
      ],
    };

    await expect(updateSensorDataByUserIdService.execute(body)).rejects.toThrow(
      new ServerError("The server has encountered an error")
    );
  });

  it("should successfully update the sensor data if the sensor exists", async () => {
    const userDb = mockSensor();

    jest
      .spyOn(sensorRepository, "findSensorByUserIdAndSensorId")
      .mockResolvedValue([userDb.sensor_groups[0].sensors[0]]);

    jest
      .spyOn(sensorRepository, "updateSensorData")
      .mockResolvedValue(undefined);

    const body = {
      user_id: userDb.user_id,
      sensor_groups: [
        {
          _id: userDb.sensor_groups[0]._id,
          sensors: [
            {
              _id: userDb.sensor_groups[0].sensors[0]._id,
              sensor_name: "Updated Sensor Name",
              location: {
                type: "Point",
                coordinates: [30, 40] as [number, number],
              },
            },
          ],
        },
      ],
    };

    await expect(
      updateSensorDataByUserIdService.execute(body)
    ).resolves.toBeUndefined();

    expect(sensorRepository.updateSensorData).toHaveBeenCalledWith(
      body.user_id,
      userDb.sensor_groups[0].sensors[0]._id,
      "Updated Sensor Name",
      { type: "Point", coordinates: [30, 40] }
    );
  });
});
