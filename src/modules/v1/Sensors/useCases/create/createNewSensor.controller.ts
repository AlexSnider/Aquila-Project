import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateNewSensorService } from "./createNewSensor.service";

export class CreateNewSensorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const body = request.body;

    const createService = container.resolve(CreateNewSensorService);

    const sensor = await createService.execute(body);

    return response.status(201).send(sensor);
  }
}

export default new CreateNewSensorController();
