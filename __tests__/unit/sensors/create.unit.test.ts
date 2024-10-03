import { newSensor } from "__tests__/factories/sensor.factories";
import "reflect-metadata";
import { Sensor } from "src/modules/v1/Sensors/entities/Sensor";
import { ISensorRepositories } from "src/modules/v1/Sensors/repositories/ISensorRepositories";
import { CreateService } from "src/modules/v1/Sensors/useCases/create/create.service";

const mockSensorRepository: jest.Mocked<ISensorRepositories> = {
  findByName: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findAll: jest.fn(),
  findByUserId: jest.fn(),
  findById: jest.fn(),
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

    const sensorData = newSensor() as Sensor;

    await createService.execute(sensorData);

    expect(mockSensorRepository.findByName).toHaveBeenCalledWith("test");
    expect(mockSensorRepository.create).toHaveBeenCalledWith(sensorData);
  });
});
