import { container } from "tsyringe";
import { Request, Response } from "express";
import { findCollectionByUserIdSerivice } from "./findCollectionByUserId.service";

class findCollectionByUserIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.params.id;
    const findCollectionByUserId = container.resolve(
      findCollectionByUserIdSerivice
    );
    const sensor = await findCollectionByUserId.execute(user_id);
    return response.status(200).json(sensor);
  }
}

export default new findCollectionByUserIdController();
