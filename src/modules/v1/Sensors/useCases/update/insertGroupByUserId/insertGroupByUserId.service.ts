import { ConflictError, NotFoundError } from "../../../../../../helpers/errors/apiErrors";
import { ISensorRepositories } from "../../../repositories/ISensorRepositories";
import { inject, injectable } from "tsyringe";
import { UUIDTypes } from "node_modules/uuid/dist/cjs";

interface IAddGroupToGroupRequest {
  user_id: UUIDTypes;
  sensor_groups: { sensor_group_name: string }[];
}

@injectable()
export class InsertGroupByUserIdService {
  constructor(
    @inject("SensorRepositories")
    private sensorRepository: ISensorRepositories
  ) {}

  async execute(body: IAddGroupToGroupRequest): Promise<void> {
    const userExists = await this.sensorRepository.findCollectionByUserId(
      body.user_id
    );

    if (!userExists || userExists.length === 0) {
      throw new NotFoundError("Sensors collection not found");
    }

    const groupExists = await this.sensorRepository.groupNameExists(
      body.user_id,
      body.sensor_groups[0].sensor_group_name
    );

    if (groupExists) {
      throw new ConflictError("Group already exists");
    }

    await this.sensorRepository.insertGroupByUserId(
      body.user_id,
      body.sensor_groups[0].sensor_group_name
    );
  }
}
