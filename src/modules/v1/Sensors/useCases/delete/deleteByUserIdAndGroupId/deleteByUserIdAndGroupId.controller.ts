import { container } from "tsyringe";
import { Request, Response } from "express";
import { DeleteByUserIdAndGroupIdService } from "./deleteByUserIdAndGroupId.service";
import { Types } from "mongoose";

class DeleteByUserIdAndGroupIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.params.user_id;
    const group_id = request.params._id;

    const groupIdObjectId = new Types.ObjectId(group_id);

    const deleteService = container.resolve(DeleteByUserIdAndGroupIdService);
    await deleteService.execute(user_id, groupIdObjectId);
    return response.sendStatus(204);
  }
}

export default new DeleteByUserIdAndGroupIdController();
