# 🛰️ Aquila – API REST para Sensores Geográficos

![Node.js](https://github.com/AlexSnider/Projeto-API-e-commerce-Node.js/assets/103783575/18da5724-9985-4320-ae21-800a2ebfb092)

<p align="center"><a href="https://nodejs.org/en" target="_blank">Node.js®</a> é um ambiente de execução JavaScript de código aberto e multiplataforma.</p>

<p align="center">
  <img src="https://github.com/AlexSnider/Mini-E-commerce-TS-Prisma/assets/103783575/ec245569-dcc4-4c21-bcf0-19f92262da5e" alt="Jaeger Icon">
  <img src="https://github.com/AlexSnider/Mini-E-commerce-TS-Prisma/assets/103783575/8e1aa77c-ebe0-4b08-8da8-8ecb9fbbe177" alt="OpenTelemetry Icon">
</p>

<p align="center">Créditos para <a href="https://www.jaegertracing.io">Jaeger</a> e <a href="https://opentelemetry.io">OpenTelemetry</a></p>

<div align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=AlexSnider_Aquila-Project">
    <img src="https://sonarcloud.io/api/project_badges/quality_gate?project=AlexSnider_Aquila-Project" alt="Quality gate" width="180">
  </a>
  <br/>
  <a href="https://sonarcloud.io/summary/new_code?id=AlexSnider_Aquila-Project">
    <img src="https://sonarcloud.io/api/project_badges/measure?project=AlexSnider_Aquila-Project&metric=coverage" alt="Coverage" width="180">
  </a>
</div>

<p align="center">Monitoramento de qualidade via <a href="https://sonarcloud.io">SonarQube</a></p>

---

## 📄 Documentação Online

Acesse a documentação Swagger:

👉 [https://aquila-project.onrender.com/docs](https://aquila-project.onrender.com/docs)

⚠️ **Nota:** A aplicação pode levar até 1 minuto para iniciar, pois a plataforma Render entra em modo de espera após 15 minutos de inatividade.

---

## 👋 Introdução

Aquila é uma API REST para registro e organização de sensores geográficos. Desenvolvida com Node.js, TypeScript, Express e MongoDB, permite:

- Cadastrar sensores;
- Agrupá-los por nome;
- Expor os dados via endpoints REST prontos para consumo por dashboards, heatmaps e aplicações externas.

Este é uma evolução do [**Projeto**](https://github.com/vittooh/aquila/wiki/Projeto-Aquila) original que foi criado pelo [**Mentor**](https://github.com/vittooh).

---

## 📝 Wiki e ADRs

Entenda melhor as decisões técnicas e arquiteturais do projeto na [**WIKI do Aquila**](https://github.com/AlexSnider/Aquila-Project/wiki).

---

## 💡 Status e Roadmap

Acompanhe [**novas features e entregas**](https://github.com/users/AlexSnider/projects/3) planejadas ou concluídas no projeto.

---

## 💻 Tecnologias Utilizadas

### Back-End

- Node.js (22.11.0 LTS)
- TypeScript
- Express
- MongoDB (Docker e Atlas)
- Mongoose
- Docker + Docker Compose
- GitHub Actions (CI/CD)
- AWS Cloud*
- Swagger Annotations
- OpenTelemetry e Jaeger (local)
- SonarQube
- Test Containers
- Jest (Testes unitários e integração)
- Clean Architecture (baseada em curso – **não endossado pelo mentor**)

📦 Veja todas as [dependências](https://github.com/AlexSnider/Aquila-Project/blob/main/package.json)

---

## ⚙️ Desenvolvimento

- Todas as implementações são revisadas pelo mentor via Pull Request.
- Baseado em **Clean Architecture**, conforme aprendido no 👉 [Curso iTalents](https://loja.italents.com.br/products/formacao-back-end-com-node-js).
- O curso foi conquistado como premiação de destaque no bootcamp iTalents.

🔗 Veja o [**Projeto Finalista do Bootcamp**](https://github.com/AlexSnider/iTalents-ATVD4)

---

## ⚙️ Conceitos Implementados

### Arquitetura

- Separação por camadas (Controller, Service, Repository)
- Clean Architecture modular
- Middlewares reutilizáveis
- Padronização de respostas
- Stateless: cada requisição é independente

### Boas práticas

- Identificadores únicos
- Validação de entrada de dados
- Containerização com Docker
- Testes automatizados (unitários e integração)
- Observabilidade local com Jaeger/OpenTelemetry

---

## 🚀 Explore o Código

### Back-End

- Containers necessários para a aplicação;
- [Conexão com banco de dados de produção](https://github.com/AlexSnider/Aquila-Project/tree/develop/src/database);
- [Conexão com banco de dados de teste](https://github.com/AlexSnider/Aquila-Project/blob/main/__tests__/config/integration.tests.config.ts);
- [Casos de uso](https://github.com/AlexSnider/Aquila-Project/tree/main/src/modules/v1/Sensors/useCases);
- [Rotas da API](https://github.com/AlexSnider/Aquila-Project/blob/develop/src/routes/v1/Sensors/sensorRoute.ts);
- [Middlewares](https://github.com/AlexSnider/Aquila-Project/tree/main/src/middleware);
- Configuração CI no [repositório](https://github.com/AlexSnider/Aquila-Project/tree/main);
- Configuração CD no [DockerHub](https://hub.docker.com/r/alexvoliveira/aquila/tags);
- [Workflows](https://github.com/AlexSnider/Aquila-Project/tree/develop/.github/workflows);
- Testes de [integração](https://github.com/AlexSnider/Aquila-Project/tree/main/__tests__/integration/sensors);
- Testes [unitários](https://github.com/AlexSnider/Aquila-Project/tree/main/__tests__/unitary/sensors);
- Documentação com [Swagger Annotations](https://github.com/AlexSnider/Aquila-Project/blob/develop/src/docs/swaggerConfig.ts).

---

## 📡 Rotas da API

| Método | Rota                                                                 | Descrição                                              |
|--------|----------------------------------------------------------------------|---------------------------------------------------------|
| POST   | `/new-sensor`                                                        | Cria um novo sensor                                     |
| GET    | `/all`                                                               | Lista todos os sensores (admin) com paginação          |
| GET    | `/user-id/:id`                                                       | Lista todos os grupos e sensores de um usuário         |
| GET    | `/user-id/:user_id/group-id/:_id`                                    | Busca um grupo específico de um usuário                |
| GET    | `/user-id/:user_id/sensor-id/:_id`                                   | Busca um sensor específico de um usuário               |
| DELETE | `/delete/user-id/:user_id`                                           | Remove toda a coleção de um usuário                    |
| DELETE | `/delete/user-id/:user_id/group-id/:_id`                             | Remove um grupo específico                             |
| DELETE | `/delete/user-id/:user_id/sensor-id/:_id`                            | Remove um sensor específico                            |
| PATCH  | `/update/user-id/:user_id/group-id/:_id`                             | Atualiza o nome de um grupo                            |
| PATCH  | `/update/user-id/:user_id/sensor-id/:_id`                            | Atualiza os dados de um sensor                         |
| PUT    | `/insert-group/user-id/:user_id`                                     | Insere um novo grupo                                   |
| PUT    | `/insert-sensor/user-id/:user_id/group-id/:_id`                      | Insere um novo sensor em um grupo                      |
| GET    | `/health-check`                                                      | Verificação de saúde da API                            |
| GET    | `/docs`                                                              | Acessa a documentação Swagger                          |

---

## 🧪 Exemplo de Dados

![Dados MongoDB](https://github.com/user-attachments/assets/3a6ea3e4-41e1-4868-8c76-293668755b32)

> **Nota:** O campo `user_id` representa o identificador único de um usuário.

---

## 🌟 Como Executar

### Pré-requisitos

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org)

---

### 🔁 Forma 1: Clonando o projeto localmente

```bash
git clone https://github.com/AlexSnider/Aquila-Project
```
Faça download do [.env.example](https://github.com/AlexSnider/Aquila-Project/blob/main/.env.example) e edite as configurações. Deixe o arquivo na pasta raiz do projeto. <br/>

>**Nota:** O Docker Compose também faz o BUILD da aplicação. Comente o service APP com ## se está rodando localmente através do clone do projeto. <br/>

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

### 🔁 Forma 2: Usando imagem Docker
Faça download do [Docker Compose](https://github.com/AlexSnider/Aquila-Project/blob/develop/docker-compose.yml) e do [.env.example](https://github.com/AlexSnider/Aquila-Project/blob/develop/.env.example).

Na linha **IMAGE**, adicione a última tag da imagem do meu [Repositório](https://hub.docker.com/r/alexvoliveira/aquila/tags) no arquivo docker-compose. Clique na tag e copie o seu endereço. 
```
Exemplo: alexvoliveira/aquila...
```
Edite o .env e o mantenha na mesma pasta do docker compose.

Abra um terminal e navegue até a pasta do docker-compose e .env.

Execute usando:
```
docker-compose up
```

Verifique os logs do container para ter acesso a documentação e a interface do Jaeger.

## Licença
Free [MIT](https://github.com/AlexSnider/Aquila-Project/blob/main/LICENSE) Licence.

