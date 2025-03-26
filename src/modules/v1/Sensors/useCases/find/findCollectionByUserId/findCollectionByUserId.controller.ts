import { container } from "tsyringe";
import { Request, Response } from "express";
import { FindCollectionByUserIdService } from "./findCollectionByUserId.service";

class FindCollectionByUserIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.params.id;

    const findCollectionByUserId = container.resolve(
      FindCollectionByUserIdService
    );

    const sensor = await findCollectionByUserId.execute(user_id);
    
    return response.status(200).json(sensor);
  }
}

export default new FindCollectionByUserIdController();
