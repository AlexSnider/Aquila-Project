import { container } from "tsyringe";
import { Request, Response } from "express";
import { FindCollectionByUserIdService } from "../findCollectionByUserId/findCollectionByUserId.service";
import { generateSensorsReport } from "../../../../../../../src/utils/generateSensorsReport";
import { NotFoundError } from "../../../../../../helpers/errors/apiErrors";

class FindSensorsByUserIdAndGenerateReportsController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.params.user_id;

      const findCollectionByUserId = container.resolve(
        FindCollectionByUserIdService
      );

      const sensor = await findCollectionByUserId.execute(user_id);

      const pdfBuffer = await generateSensorsReport(sensor);

      response.setHeader("Content-Type", "application/pdf");
      response.setHeader("Content-Disposition", "inline; filename=report.pdf");

      return response.status(200).send(pdfBuffer);
    } catch (error: unknown) {
      if (error instanceof NotFoundError) {
        return response
          .status(error.statusCode)
          .json({ message: error.message });
      }
      return response.status(500).json({ message: "Unexpected error" });
    }
  }
}

export default new FindSensorsByUserIdAndGenerateReportsController();
