import { Request, Response } from "express";
import { container } from "tsyringe";
import { InsertGroupByUserIdService } from "./insertGroupByUserId.service";

class InsertGroupByUserIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.params.user_id;
    
    const { sensor_group_name } = request.body;

    const insertGroupByUserId = container.resolve(InsertGroupByUserIdService);

    await insertGroupByUserId.execute({
      user_id,
      sensor_groups: [{ sensor_group_name }],
    });

    return response.status(204).send();
  }
}

export default new InsertGroupByUserIdController();
