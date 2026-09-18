# 🚌 Seu Ônibus, Sua Rota

> **Seu ônibus. Sua rota. Seu tempo.**

Sistema web para acompanhamento de ônibus públicos e escolares em tempo real, permitindo consultar veículos, rotas e informações de transporte.

## 📌 Sobre o projeto

O **Seu Ônibus, Sua Rota** tem como objetivo facilitar o acompanhamento do transporte público e escolar por meio de uma plataforma web.

A proposta utiliza tecnologias como **GPS, RFID e mapas** para permitir o acompanhamento dos ônibus, suas rotas e informações relacionadas ao transporte.

## 🎯 Objetivos

* Cadastrar e gerenciar ônibus.
* Identificar veículos por RFID.
* Consultar rotas e paradas.
* Permitir o acompanhamento da localização dos ônibus.
* Exibir informações de transporte de forma simples e acessível.

## 🛠️ Tecnologias

* **TypeScript**
* **NestJS**
* **Prisma ORM**
* **PostgreSQL**
* **Neon PostgreSQL**
* **Node.js**

O Prisma é utilizado como ORM para realizar o acesso ao banco de dados PostgreSQL. A aplicação utiliza o adapter do Neon para a conexão em tempo de execução.

## 📁 Estrutura do projeto

```text
SeuOnibus-SuaRota/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   │
│   └── src/
│       ├── generated/
│       ├── onibus/
│       │   ├── dto/
│       │   ├── onibus.controller.ts
│       │   ├── onibus.module.ts
│       │   └── onibus.service.ts
│       │
│       └── prisma/
│           ├── prisma.module.ts
│           └── prisma.service.ts
│
├── docs/
│   └── canvas.md
│
└── README.md
```

## 🚌 Entidade: Ônibus

A implementação individual deste projeto corresponde à entidade **Ônibus**.

### Campos

| Campo               | Tipo    | Descrição                                |
| ------------------- | ------- | ---------------------------------------- |
| `id`                | Integer | Identificador único                      |
| `placa`             | String  | Placa do ônibus                          |
| `identificacaoRFID` | String  | Identificação RFID do veículo            |
| `modelo`            | String  | Modelo do ônibus                         |
| `status`            | String  | Situação do ônibus: `ATIVO` ou `INATIVO` |

### 🔗 Endpoints

| Método   | Endpoint      | Descrição               |
| -------- | ------------- | ----------------------- |
| `POST`   | `/onibus`     | Cadastrar ônibus        |
| `GET`    | `/onibus`     | Listar ônibus           |
| `GET`    | `/onibus/:id` | Consultar ônibus por ID |
| `PATCH`  | `/onibus/:id` | Atualizar ônibus        |
| `DELETE` | `/onibus/:id` | Excluir ônibus          |

## 🧪 Exemplos de uso

### Cadastrar ônibus

```http
POST /onibus
Content-Type: application/json
```

```json
{
  "placa": "PEA1B23",
  "identificacaoRFID": "RFID001",
  "modelo": "Mercedes-Benz OF-1721",
  "status": "ATIVO"
}
```

### Listar ônibus

```http
GET /onibus
```

### Buscar por ID

```http
GET /onibus/1
```

### Atualizar

```http
PATCH /onibus/1
Content-Type: application/json
```

```json
{
  "status": "INATIVO"
}
```

### Excluir

```http
DELETE /onibus/1
```

## 🗄️ Banco de dados

O projeto utiliza **PostgreSQL hospedado no Neon**.

As informações de conexão devem ser configuradas no arquivo `.env`:

```env
DATABASE_URL="sua_conexao_pooler_do_neon"
DIRECT_URL="sua_conexao_direta_do_neon"
```

O arquivo `.env` não deve ser enviado para o repositório. Para configuração de outros ambientes, utilize o `.env.example`.

## ▶️ Como executar

Entre na pasta do backend:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Gere o Prisma Client:

```bash
npx prisma generate
```

Execute o projeto:

```bash
npm run start
```

A API estará disponível em:

```text
http://localhost:3000
```

## ✅ Validação

A entidade **Ônibus** foi testada através dos endpoints da API:

* Cadastro de ônibus;
* Listagem;
* Consulta por ID;
* Atualização;
* Exclusão.

Todos os testes CRUD foram executados com sucesso utilizando o banco PostgreSQL hospedado no Neon.

## 👥 Trabalho em equipe

O projeto é desenvolvido de forma colaborativa, com cada integrante responsável pela implementação de uma entidade do sistema.

As funcionalidades são organizadas em branches individuais e posteriormente integradas ao projeto principal.

## 📄 Documentação

A documentação inicial do projeto está disponível na pasta:

```text
docs/
```

## 👩‍💻 Integrante responsável pela entidade Ônibus

**Marjory Letícia**

Responsável pela implementação da entidade **Ônibus**, incluindo:

* Modelagem da entidade;
* DTOs;
* Validação dos dados;
* CRUD;
* Integração com Prisma;
* Integração com PostgreSQL/Neon;
* Testes dos endpoints.
