import { Sensor } from "../entities/Sensor";

export interface ISensorRepositories {
  create(body: Sensor): Promise<void>;
  findByUserId(user_id: string): Promise<Sensor | null>;
  findAll(limit: number, offset: number): Promise<Sensor[]>;
  findById(id: string): Promise<Sensor | null>;
  update(id: string, data: Sensor): Promise<void>;
  delete(id: string): Promise<void>;
}
