import { Request, Response } from "express";
import { Types } from "mongoose";
import { container } from "tsyringe";
import { UpdateSensorDataService } from "./updateSensorDataByUserId.service";

class UpdateSensorDataController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.params.user_id;
    
    const sensor_id = request.params._id;

    const { sensor_name, location } = request.body;

    const sensor_idObject = new Types.ObjectId(sensor_id);

    const updateSensorDataService = container.resolve(UpdateSensorDataService);

    await updateSensorDataService.execute({
      user_id,
      sensor_groups: [
        {
          sensors: [
            {
              _id: sensor_idObject,
              sensor_name,
              location,
            },
          ],
        },
      ],
    });

    return response.status(204).send();
  }
}

export default new UpdateSensorDataController();
