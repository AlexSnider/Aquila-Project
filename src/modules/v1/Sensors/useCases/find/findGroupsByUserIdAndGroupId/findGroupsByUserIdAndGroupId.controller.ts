import { container } from "tsyringe";
import { Request, Response } from "express";
import { FindGroupsByUserIdAndGroupIdService } from "./findGroupsByUserIdAndGroupId.service";
import { Types } from "mongoose";

class findGroupsByUserIdAndGroupIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.params.user_id;
    const groupId = request.params._id;

    const groupIdObject = new Types.ObjectId(groupId);

    const findGroupsByUserIdAndGroupId = container.resolve(
      FindGroupsByUserIdAndGroupIdService
    );
    const sensor = await findGroupsByUserIdAndGroupId.execute(
      user_id,
      groupIdObject
    );
    return response.status(200).json(sensor);
  }
}

export default new findGroupsByUserIdAndGroupIdController();
