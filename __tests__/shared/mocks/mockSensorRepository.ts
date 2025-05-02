import { ISensorRepositories } from "src/modules/v1/Sensors/repositories/ISensorRepositories";

export const mockSensorRepository: jest.Mocked<ISensorRepositories> = {
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  findByName: jest.fn(),
  findByUserId: jest.fn(),
};