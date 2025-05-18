import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../../docs/swaggerConfig";

const DocsRoute = Router();

DocsRoute.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default DocsRoute;
