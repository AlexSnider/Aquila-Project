import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateGroupNameService } from "./updateGroupNameByUserId.service";
import { Types } from "mongoose";

class UpdateGroupNameController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.params.user_id;

    const group_id = request.params._id;
    
    const { sensor_group_name } = request.body;

    const group_idObject = new Types.ObjectId(group_id);

    const updateGroupNameService = container.resolve(UpdateGroupNameService);

    await updateGroupNameService.execute({
      user_id,
      sensor_groups: [{ _id: group_idObject, sensor_group_name }],
    });

    return response.status(204).send();
  }
}

export default new UpdateGroupNameController();
