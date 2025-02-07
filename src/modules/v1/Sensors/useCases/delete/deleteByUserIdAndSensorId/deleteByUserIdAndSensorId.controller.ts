import { container } from "tsyringe";
import { Request, Response } from "express";
import { Types } from "mongoose";
import { DeleteByUserIdAndSensorIdService } from "./deleteByUserIdAndSensorId.service";

class DeleteByUserIdAndSensorIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.params.user_id;
    const sensor_id = request.params._id;

    const sensorIdObjectId = new Types.ObjectId(sensor_id);

    const deleteService = container.resolve(DeleteByUserIdAndSensorIdService);
    await deleteService.execute(user_id, sensorIdObjectId);
    return response.sendStatus(204);
  }
}

export default new DeleteByUserIdAndSensorIdController();
