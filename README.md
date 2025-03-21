# Aquila - ShipYard

![node-js-736399_1920](https://github.com/AlexSnider/Projeto-API-e-commerce-Node.js/assets/103783575/18da5724-9985-4320-ae21-800a2ebfb092)
<p align="center"><a href="https://nodejs.org/en" target="_blank">Node.js®</a> is an open-source, cross-platform JavaScript runtime environment.</p>

<p align="center">
  <img src="https://github.com/AlexSnider/Mini-E-commerce-TS-Prisma/assets/103783575/ec245569-dcc4-4c21-bcf0-19f92262da5e" alt="Jaeger Icon">
  <img src="https://github.com/AlexSnider/Mini-E-commerce-TS-Prisma/assets/103783575/8e1aa77c-ebe0-4b08-8da8-8ecb9fbbe177" alt="OpenTelemetry Icon">
</p>

<p align="center">All credits to <a href="https://www.jaegertracing.io">Jaeger</a> and <a href="https://opentelemetry.io">OpenTelemetry</a></p><br/>

<div align="center">
  
[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=AlexSnider_Aquila-Project)](https://sonarcloud.io/summary/new_code?id=AlexSnider_Aquila-Project) <br/>
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=AlexSnider_Aquila-Project&metric=coverage)](https://sonarcloud.io/summary/new_code?id=AlexSnider_Aquila-Project)

</div>

<p align="center">Credits to <a href="https://sonarcloud.io">SonarQube</a></p>



## 👋 Introdução
O [Projeto](https://github.com/vittooh/aquila/wiki/Projeto-Aquila) foi desenvolvido como parte de uma nova empreitada do [Mentor](https://github.com/vittooh) que lançou o desafio para seus mentorados (*EU*), para que pudesse por em prática as habilidades adiquiridas.

>**Nota 1:** Atualmente o projeto encontra-se em desenvolvimento constante.

## 📝 Wiki do Projeto
Você pode entender melhor as decisões tomadas no desenvolvimento do projeto através da [Wiki](https://github.com/AlexSnider/Aquila-Project/wiki) do Aquila.

## 💻 Tecnologias
Para essa versão do projeto, utilizei (implementarei):
### Back-End
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

## ⚙️ Desenvolvimento

As implementações sempre passam pela avaliação do mentor antes de serem aprovadas (via PR).

A base do back-end vem do [Curso](https://loja.italents.com.br/products/formacao-back-end-com-node-js) da iTalents que ganhei por ter conseguido ser destaque no bootcamp com eles. <br/><br/>
Acesse aqui: [Projeto Finalista](https://github.com/AlexSnider/iTalents-ATVD4).

### Conceito REST
 - A API conta com padrões REST, seguido a lógica dos verbos HTTP para sua elaboração;
 - As respostas da API seguem o padrão JSON, garantindo compatibilidade e simplicidade;
 - Stataless: Cada requisição contém todas as informações necessárias, sem depender do estado de requisições anteriores

## 🚀 Partes já concluídas
### Back-End (em reestruturação para a versão 2.0)
- Containers necessários para a aplicação;
- [Conexão](https://github.com/AlexSnider/Aquila-Project/tree/develop/src/database) com banco de dados separados (produção e testes);
- [Casos de uso](https://github.com/AlexSnider/Aquila-Project/tree/develop/src/modules/v1/Sensors/useCases) pertinentes;
- [Rotas](https://github.com/AlexSnider/Aquila-Project/blob/develop/src/routes/v1/Sensors/sensorRoute.ts);
- CI no [Repositório](https://github.com/AlexSnider/Aquila-Project/tree/develop);
- CD no [DockerHub](https://hub.docker.com/r/alexvoliveira/aquila/tags);
- [Workflows](https://github.com/AlexSnider/Aquila-Project/tree/develop/.github/workflows);
- Documentação com [Swagger Annotations](https://github.com/AlexSnider/Aquila-Project/blob/develop/src/docs/swaggerConfig.ts);
- Testes de [Integração](https://github.com/AlexSnider/Aquila-Project/tree/develop/__tests__/integration/sensors);

#### Dados na coleção do MongoDB - Estrutura (2.0)
![image](https://github.com/user-attachments/assets/3a6ea3e4-41e1-4868-8c76-293668755b32)
>**Nota 2:** user_id representa o id de um usuário.

## 💡 A fazer
Aqui você encontra as [Novidades](https://github.com/users/AlexSnider/projects/3) a serem implementadas.


>**Nota 3:** A aplicação já teve o seu Deploy efetuado na AWS (versão 1.0 sem grupos de sensores) usando Fargate (em off por motivos financeiros). <br/>

## 🌟 Como usar

Clone o repositório para rodar localmente:
```
git clone https://github.com/AlexSnider/Aquila-Project
```
OU

Faça Docker Pull da última imagem do [repositório](https://hub.docker.com/r/alexvoliveira/aquila/tags) e depois o download do [.env.example](https://github.com/AlexSnider/Aquila-Project/blob/develop/.env.example). Edite as configurações. Lembre-se de adicionar o serviço MongoDB ao docker compose, caso queira usar localmente. Você precisará do [Docker Compose](https://github.com/AlexSnider/Aquila-Project/blob/develop/docker-compose.yml) para isso.

Adicione o path:
```
env_file: - ./path/to/your/.env
```
para o .env ao docker compose.

Execute usando:
```
docker-compose up
```

## Licença
Free [MIT](https://github.com/AlexSnider/Aquila-Project/blob/main/LICENSE) Licence.
