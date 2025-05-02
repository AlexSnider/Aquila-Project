import {
  newSensor,
} from "__tests__/factories/sensor.factories";
import "reflect-metadata";
import { ISensorRepositories } from "src/modules/v1/Sensors/repositories/ISensorRepositories";
import { CreateService } from "src/modules/v1/Sensors/useCases/create/create.service";

const mockSensorRepository: jest.Mocked<ISensorRepositories> = {
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  findByName: jest.fn(),
  findByUserId: jest.fn(),
};

describe("Create Sensor", () => {
  let createService: CreateService;

  beforeEach(() => {
    createService = new CreateService(mockSensorRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a sensor if it does not already exist", async () => {
    mockSensorRepository.findByName.mockResolvedValueOnce(null);

    const sensorData = newSensor();
    const sensorDataCorrected = {
      ...sensorData,
      location: {
        type: "Point" as "Point",
        coordinates: sensorData.location.coordinates as unknown as [
          number,
          number
        ],
      },
    };

    const result = await createService.execute(sensorDataCorrected);

    expect(mockSensorRepository.findByName).toHaveBeenCalledWith(
      sensorData.sensor_name
    );

    expect(result).toHaveProperty("_id");
    expect(result).toHaveProperty("sensor_name");
    expect(result).toHaveProperty("user_id");
    expect(result).toHaveProperty("location");
    expect(result).toHaveProperty("createdAt");
    expect(result).toHaveProperty("updatedAt");

    expect(typeof result.location).toBe("object");
    expect(result.location).not.toBeNull();
    expect(result.location).toHaveProperty("coordinates");
    expect(Array.isArray(result.location.coordinates)).toBe(true);
  });
});
