# Aquila - ShipYard

![node-js-736399_1920](https://github.com/AlexSnider/Projeto-API-e-commerce-Node.js/assets/103783575/18da5724-9985-4320-ae21-800a2ebfb092)
<p align="center"><a href="https://nodejs.org/en" target="_blank">Node.js®</a> is an open-source, cross-platform JavaScript runtime environment.</p>

## 👋 Introdução
O [Projeto](https://github.com/vittooh/aquila/wiki/Projeto-Aquila) foi desenvolvido como parte de uma nova empreitada do [Mentor](https://github.com/vittooh) que lançou o desafio para seus mentorados EU e o [Joelson](https://github.com/joabysonSouza), para que pudessemos por em prática nossas habilidades.

>**Nota:** Atualmente o projeto encontra-se em desenvolvimento constante.

## 💻 Tecnologias
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
- Jest Tests;
- [Test Containers](https://testcontainers.com); <br/>
- Algumas bases de CleanArch
- Swagger Annotations;
- OpenTelemtry e Jaeger Tracer (apenas localmente);

### Frontend
- Next.js

## ⚙️ Desenvolvimento
Eu (Alex), fui encarregado de desenvolver o backend por completo e o (Joelson), o frontend.

As implementações sempre passam pela avaliação do mentor antes de serem aprovadas (via PR).

A base do backend vem do [curso](https://loja.italents.com.br/products/formacao-back-end-com-node-js) da iTalents que ganhei por ter conseguido ser destaque no bootcamp com eles. Acesse aqui: [Projeto Finalista](https://github.com/AlexSnider/iTalents-ATVD4).

### Conceito REST
 - A API conta com padrões REST, seguido a lógica dos verbos HTTP para sua elaboração;
 - As respostas da API seguem o padrão JSON, garantindo compatibilidade e simplicidade;
 - Stataless: Cada requisição contém todas as informações necessárias, sem depender do estado de requisições anteriores

## 🚀 Partes já concluídas
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

#### Dados na coleção do MongoDB Atlas
![image](https://github.com/user-attachments/assets/2d0ee97c-b2ba-46ee-8e65-b00214d003f9)
>**Nota:** user_id representa o id de um usuário (futura implementação com KeyCloak).

### 💡 A fazer
- Testes de Unidade;
- Refinamento do Workflows;
- Ajustes gerais;
- Métricas com Jaeger Tracer e OpenTelemetry;
- Login de usuários (futura implementação com KeyCloak);


>**Nota:** A aplicação já teve o seu Deploy efetuado na AWS usando Fargate (em off por motivos financeiros). <br/>
### Frontend (Joelson)
- Mapa de calor dos sensores;
- Login de usuários (futura implementação com KeyCloak).

## 🌟 Como usar

Faça Docker Pull da última imagem do [repositório](https://hub.docker.com/r/alexvoliveira/aquila/tags) e depois o download do [.env.example](https://github.com/AlexSnider/Aquila-Project/blob/develop/.env.example). Edite as configurações. Lembre-se de adicionar o serviço MongoDB ao docker compose, caso queira usar localmente. Você precisará do [Docker Compose](https://github.com/AlexSnider/Aquila-Project/blob/develop/docker-compose.yml) para isso.

Adicione o path  ```env_file:
      - ./path/to/your/.env``` para o .env ao docker compose.

Execute usando ```docker-compose up```.

<br/><br/>

<p align="center">
  <img src="https://github.com/AlexSnider/Mini-E-commerce-TS-Prisma/assets/103783575/ec245569-dcc4-4c21-bcf0-19f92262da5e" alt="Jaeger Icon">
  <img src="https://github.com/AlexSnider/Mini-E-commerce-TS-Prisma/assets/103783575/8e1aa77c-ebe0-4b08-8da8-8ecb9fbbe177" alt="OpenTelemetry Icon">
</p>

<p align="center">All credits to <a href="https://www.jaegertracing.io">Jaeger</a> and <a href="https://opentelemetry.io">OpenTelemetry</a></p>

## Licença
Free [MIT](https://github.com/AlexSnider/Aquila-Project/blob/main/LICENSE) Licence.
