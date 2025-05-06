import { container } from "tsyringe";
import { Request, Response } from "express";
import { FindCollectionByUserIdService } from "../findCollectionByUserId/findCollectionByUserId.service";
import { generateSensorsReport } from "src/utils/generateSensorsReport";

class FindSensorsByUserIdAndGenerateReportsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.params.user_id;

    const findCollectionByUserId = container.resolve(
      FindCollectionByUserIdService
    );

    const sensor = await findCollectionByUserId.execute(user_id);

    const pdfBuffer = await generateSensorsReport(sensor);

    response.setHeader("Content-Type", "application/pdf");
    response.setHeader("Content-Disposition", "inline; filename=relatorio.pdf");

    return response.status(200).send(pdfBuffer);
  }
}

export default new FindSensorsByUserIdAndGenerateReportsController();
