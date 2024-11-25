# Aquila - ShipYard

## Introdução
O [Projeto](https://github.com/vittooh/aquila/wiki/Projeto-Aquila) foi desenvolvido como parte de uma nova empreitada do [Mentor](https://github.com/vittooh) que lançou o desafio para seus mentorados EU e o [Joelson](https://github.com/joabysonSouza), para que pudessemos por em prática nossas habilidades.

>**Nota:** Atualmente o projeto encontra-se em desenvolvimento constante.

## Tecnologias
Para a nossa versão do projeto, utilizamos:
### Backend
- Node.js (22.11.0 LTS);
- TypeScript;
- Express;
- MongoDB Docker > migração para MongoDB Atlas;
- Mongoose;
- AWS Cloud;
- CI/CD;
- GitHub Actions;
- Docker;
- Jest;
- Test Containers; <br/>
- Algumas bases de CleanArch
- Swagger Annotations;
- OpenTelemtry e Jaeger Tracer;

### Frontend
- Next.js

## Desenvolvimento
Eu (Alex), fui encarregado de desenvolver o backend por completo e o (Joelson), o frontend.

As implementações sempre passam pela avaliação do mentor antes de serem aprovadas (via PR).

## Partes já concluídas
### Backend (Alex)
- Containers necessários para a aplicação;
- [Conexão](https://github.com/AlexSnider/Aquila-Project/tree/develop/src/database) com banco de dados separados (produção e testes);
- [Casos de uso](https://github.com/AlexSnider/Aquila-Project/tree/develop/src/modules/v1/Sensors/useCases) pertinentes;
- [Rotas](https://github.com/AlexSnider/Aquila-Project/blob/develop/src/routes/v1/Sensors/sensorRoute.ts);
- CI no [Repositório](https://github.com/AlexSnider/Aquila-Project/tree/develop);
- CD no [DockerHub](https://hub.docker.com/r/alexvoliveira/aquila/tags);
- [Workflows](https://github.com/AlexSnider/Aquila-Project/tree/develop/.github/workflows);
- Documentação com [Swagger Annotations](https://github.com/AlexSnider/Aquila-Project/blob/develop/src/docs/swaggerConfig.ts);
- Testes de [Integração](https://github.com/AlexSnider/Aquila-Project/tree/develop/__tests__/integration/sensors);

### A fazer
- Testes de Unidade;
- Refinamento do Workflows;
- Ajustes gerais;
- Métricas com Jaeger Tracer e OpenTelemetry;
- Login de usuários (futura implementação);


>**Nota:** A aplicação já teve o seu Deploy efetuado na AWS usando Fargate (em off por motivos financeiros). <br/>
### Frontend (Joelson)
- Mapa de calor dos sensores
- Login de usuários (futura implementação)

## Licença
Free [MIT](https://github.com/AlexSnider/Aquila-Project/blob/main/LICENSE) Licence.
