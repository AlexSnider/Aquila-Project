import { newSensor } from "__tests__/factories/sensor.factories";
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

    await createService.execute(sensorData);

    expect(mockSensorRepository.findByName).toHaveBeenCalledWith(
      sensorData.sensor_name
    );
    expect(mockSensorRepository.create).toHaveBeenCalledWith(sensorData);
    expect(Array.isArray(sensorData.coordinates)).toBe(true);
    expect(sensorData.coordinates.length).toBe(2);
  });
});
