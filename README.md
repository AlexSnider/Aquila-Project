# Aquila - ShipYard

![node-js-736399_1920](https://github.com/AlexSnider/Projeto-API-e-commerce-Node.js/assets/103783575/18da5724-9985-4320-ae21-800a2ebfb092)
<p align="center"><a href="https://nodejs.org/en" target="_blank">Node.js®</a> is an open-source, cross-platform JavaScript runtime environment.</p>

<p align="center">
  <img src="https://github.com/AlexSnider/Mini-E-commerce-TS-Prisma/assets/103783575/ec245569-dcc4-4c21-bcf0-19f92262da5e" alt="Jaeger Icon">
  <img src="https://github.com/AlexSnider/Mini-E-commerce-TS-Prisma/assets/103783575/8e1aa77c-ebe0-4b08-8da8-8ecb9fbbe177" alt="OpenTelemetry Icon">
</p>

<p align="center">All credits to <a href="https://www.jaegertracing.io">Jaeger</a> and <a href="https://opentelemetry.io">OpenTelemetry</a></p><br/>

<div align="center">
  
  <a href="https://sonarcloud.io/summary/new_code?id=AlexSnider_Aquila-Project">
    <img src="https://sonarcloud.io/api/project_badges/quality_gate?project=AlexSnider_Aquila-Project" alt="Quality gate" width="180">
  </a>
  <br/>
  <a href="https://sonarcloud.io/summary/new_code?id=AlexSnider_Aquila-Project">
    <img src="https://sonarcloud.io/api/project_badges/measure?project=AlexSnider_Aquila-Project&metric=coverage" alt="Coverage" width="180">
  </a>

</div>


<p align="center">Credits to <a href="https://sonarcloud.io">SonarQube</a></p>



## 👋 Introdução
O [**PROJETO**](https://github.com/vittooh/aquila/wiki/Projeto-Aquila) foi desenvolvido como parte de uma nova empreitada do [**MENTOR**](https://github.com/vittooh) que lançou o desafio para seus mentorados (sendo eu um deles), para que pudesse por em prática as habilidades adiquiridas.

⚠️ **Esse projeto é uma Evolução do Aquila Original**.

>**Nota 1:** Atualmente o projeto encontra-se em fase final desenvolvimento.

## 📝 Wiki do Projeto - ADR
Você pode entender melhor as decisões tomadas no desenvolvimento do projeto através da [**WIKI**](https://github.com/AlexSnider/Aquila-Project/wiki) do Aquila (em progresso).

## 💻 Tecnologias
Para essa versão do projeto, utilizei:
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
- SonarQube;
- [Test Containers](https://testcontainers.com); <br/>
- Algumas bases de Clean Achitecture; 👉 **BASEADO NO CURSO E NÃO ENDOSSADO PELO MENTOR**
- Swagger Annotations;
- OpenTelemetry e Jaeger Tracer (apenas localmente);
- [Dependências](https://github.com/AlexSnider/Aquila-Project/blob/main/package.json) utilizadas.

## ⚙️ Desenvolvimento

As implementações sempre passam pela avaliação do mentor antes de serem aprovadas (via PR).

A base do Back-End vem do 👉 [Curso](https://loja.italents.com.br/products/formacao-back-end-com-node-js) da iTalents que ganhei por ter conseguido ser destaque no bootcamp com eles. <br/><br/>
Acesse aqui: 👉 [Projeto Finalista](https://github.com/AlexSnider/iTalents-ATVD4).

### Conceito REST
 - A API conta com padrões REST, seguido a lógica dos verbos HTTP para sua elaboração;
 - As respostas da API seguem o padrão JSON, garantindo compatibilidade e simplicidade;
 - Stateless: Cada requisição contém todas as informações necessárias, sem depender do estado de requisições anteriores.

## 🚀 Partes já concluídas
### Back-End
- Containers necessários para a aplicação;
- [Conexão](https://github.com/AlexSnider/Aquila-Project/tree/develop/src/database) com banco de dados produção;
- [Conexão](https://github.com/AlexSnider/Aquila-Project/blob/main/__tests__/config/integration.tests.config.ts) com banco de dados de teste;
- [Casos de uso](https://github.com/AlexSnider/Aquila-Project/tree/main/src/modules/v1/Sensors/useCases) pertinentes;
- [Rotas](https://github.com/AlexSnider/Aquila-Project/blob/develop/src/routes/v1/Sensors/sensorRoute.ts);
- [Middlewares](https://github.com/AlexSnider/Aquila-Project/tree/main/src/middleware);
- CI no [Repositório](https://github.com/AlexSnider/Aquila-Project/tree/main);
- CD no [DockerHub](https://hub.docker.com/r/alexvoliveira/aquila/tags);
- [Workflows](https://github.com/AlexSnider/Aquila-Project/tree/develop/.github/workflows);
- Testes de [Integração](https://github.com/AlexSnider/Aquila-Project/tree/main/__tests__/integration/sensors);
- Testes [Unitários](https://github.com/AlexSnider/Aquila-Project/tree/main/__tests__/unitary/sensors);
- Documentação com [Swagger Annotations](https://github.com/AlexSnider/Aquila-Project/blob/develop/src/docs/swaggerConfig.ts).

#### Dados de exemplo na coleção do MongoDB:
![image](https://github.com/user-attachments/assets/3a6ea3e4-41e1-4868-8c76-293668755b32)
>**Nota 2:** user_id representa o id de um usuário. Ver Wiki para mais informações.

## 💡 A fazer
Aqui você encontra as [Novidades](https://github.com/users/AlexSnider/projects/3) a serem implementadas.


>**Nota 3:** A aplicação já teve o seu Deploy efetuado na AWS (versão 1.0 sem grupos de sensores) usando Fargate (em off por motivos financeiros). <br/>

## 🌟 Como usar

Clone o repositório para rodar localmente:
```
git clone https://github.com/AlexSnider/Aquila-Project
```
Faça download do [.env.example](https://github.com/AlexSnider/Aquila-Project/blob/main/.env.example) e edite as configurações. Deixe o arquivo na pasta raiz do projeto. <br/>

>**Nota 4:** O Docker Compose também faz o BUILD da aplicação. Comente o service APP com ## se está rodando localmente através do clone do projeto. <br/>

Após, execute, primeiramente:
```
docker-compose up
```
Para levantar um container com o Jaeger Collector e após isso:
```
npm install
npm start
```
👉 Não se esqueça de editar e renomear o .env.example com as suas configurações.<br/>

**OU**

Faça download do [Docker Compose](https://github.com/AlexSnider/Aquila-Project/blob/develop/docker-compose.yml) e do [.env.example](https://github.com/AlexSnider/Aquila-Project/blob/develop/.env.example).

Na linha IMAGE, adicione a última tag da imagem do meu [Repositório](https://hub.docker.com/r/alexvoliveira/aquila/tags) no arquivo docker-compose. Clique na tag e copie o seu endereço. 

Exemplo: alexvoliveira/aquila...

Edite o .env e o mantenha na mesma pasta do docker compose.

Abra um terminal e navegue até a pasta do docker-compose e .env.

Execute usando:
```
docker-compose up
```

Verifique os logs do container para ter acesso a documentação e a interface do Jaeger.

## Licença
[![SonarQube Cloud](https://sonarcloud.io/images/project_badges/sonarcloud-light.svg)](https://sonarcloud.io/summary/new_code?id=AlexSnider_Aquila-Project)<br/>
Free [MIT](https://github.com/AlexSnider/Aquila-Project/blob/main/LICENSE) Licence.
