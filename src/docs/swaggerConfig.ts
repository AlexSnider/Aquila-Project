import swaggerJSDoc from "swagger-jsdoc";

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Áquila Sensores Geográficos - Documentação",
      version: "2.0.0",
      description: `Essa documentação descreve os endpoints da API responsável por gerenciar
                    sensores geográficos, incluindo verificação de status e operações CRUD.
                    Use a rota Find "ALL" para conseguir dados de teste para outras requisições.`,
      contact: {
        name: "Equipe de Desenvolvimento",
        email: "alexsnider8@gmail.com",
        url: "https://github.com/AlexSnider/Aquila-Project",
      },
      license: {
        name: "Licença",
        url: "https://github.com/AlexSnider/Aquila-Project/blob/main/LICENSE",
      },
    },
    servers: [
      {
        url: "https://aquila-project.onrender.com",
        description: "HTTPS",
      },
      {
        url: "http://localhost:3000",
        description: "HTTP",
      },
    ],
    tags: [
      {
        name: "Health Check",
        description: "Verifica o status da aplicação",
      },
      {
        name: "Sensors",
        description: "Operações relacionadas a sensores",
      },
    ],
  },
  apis: ["./src/routes/health-check/*.ts", "./src/routes/v1/Sensors/*.ts"],
});

export default swaggerSpec;
