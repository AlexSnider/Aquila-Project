import swaggerJSDoc from "swagger-jsdoc";

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API documentation for the application.",
    },
    servers: [
      {
        url: "http://localhost:3005/",
        description: "Sensors API",
      },
    ],
  },
  apis: ["./src/routes/health-check/*.ts", "./src/routes/v1/Sensors/*.ts"],
});

export default swaggerSpec;
