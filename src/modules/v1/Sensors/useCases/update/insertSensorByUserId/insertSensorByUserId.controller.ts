import { Request, Response } from "express";
import { container } from "tsyringe";
import { insertSensorByUserIdService } from "./insertSensorByUserId.service";
import { Types } from "mongoose";

class InsertSensorDataByUserIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.params.user_id;

    const group_id = request.params._id;
    
    const { sensor_name, coordinates } = request.body;

    const groupIdObject = new Types.ObjectId(group_id);

    const insertSensorByUserId = container.resolve(insertSensorByUserIdService);

    await insertSensorByUserId.execute({
      user_id,
      groupIdObject,
      sensor_name,
      coordinates,
    });

    return response.status(204).send();
  }
}

export default new InsertSensorDataByUserIdController();
