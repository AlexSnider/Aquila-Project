import { container } from "tsyringe";
import { Request, Response } from "express";
import { Types } from "mongoose";
import { FindSensorByUserIdAndSensorIdService } from "./findSensorByUserIdAndSensorId.service";

class findSensorByUserIdAndSensorIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.params.user_id;

    const sensorId = request.params._id;

    const sensorIdObject = new Types.ObjectId(sensorId);

    const findSensorByUserIdAndSensorId = container.resolve(
      FindSensorByUserIdAndSensorIdService
    );

    const sensor = await findSensorByUserIdAndSensorId.execute(
      user_id,
      sensorIdObject
    );
    
    return response.status(200).json(sensor);
  }
}

export default new findSensorByUserIdAndSensorIdController();
