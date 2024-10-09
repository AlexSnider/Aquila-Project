import { Sensor } from "../entities/Sensor";

export interface ISensorRepositories {
  create(body: Sensor): Promise<Sensor>;
  update(id: string, data: Sensor): Promise<void>;
  delete(id: string): Promise<void>;
  findAll(limit: number, offset: number): Promise<Sensor[]>;
  findByUserId(user_id: string): Promise<Sensor[] | null>;
  findByName(sensor_name: string): Promise<Sensor | null>;
  findById(id: string): Promise<Sensor>;
}
