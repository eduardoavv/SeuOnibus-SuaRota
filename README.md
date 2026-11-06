# 🚌 Seu Ônibus, Sua Rota — No Ponto

**Seu ônibus. Sua rota. Seu tempo.**

O **No Ponto** é um sistema desenvolvido para acompanhar ônibus públicos e escolares, permitindo o gerenciamento de veículos, rotas, paradas, usuários e localizações. O objetivo é facilitar o acompanhamento dos transportes e oferecer informações que ajudem os passageiros a organizar melhor seus deslocamentos.

## 🎯 Objetivos do projeto

- Gerenciar os ônibus cadastrados no sistema.
- Identificar veículos por meio de RFID.
- Cadastrar e organizar rotas e paradas.
- Registrar a localização dos ônibus por GPS.
- Gerenciar os usuários da plataforma.

## 🛠️ Tecnologias utilizadas

- **TypeScript** — linguagem de programação.
- **Node.js** — ambiente de execução.
- **NestJS** — framework para desenvolvimento do backend.
- **Prisma ORM** — gerenciamento e comunicação com o banco de dados.
- **PostgreSQL** — sistema gerenciador de banco de dados.
- **Neon** — serviço de PostgreSQL em nuvem.
- **bcrypt** — proteção de senhas.

## 📁 Estrutura do projeto

```text
SeuOnibus-SuaRota/
│
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   │
│   └── src/
│       ├── onibus/
│       ├── usuarios/
│       ├── rotas/
│       ├── paradas/
│       ├── localizacao/
│       ├── prisma/
│       ├── app.module.ts
│       └── main.ts
│
├── docs/
├── avaliacao/
├── package.json
└── README.md
```

## ⚙️ Módulos do sistema

| Módulo | Responsabilidade |
|---|---|
| **Ônibus** | Cadastro, consulta, atualização e remoção de ônibus. |
| **Usuários** | Gerenciamento dos usuários e proteção das senhas com bcrypt. |
| **Rotas** | Gerenciamento das rotas dos veículos. |
| **Paradas** | Cadastro e gerenciamento dos pontos de parada. |
| **Localização** | Registro das coordenadas geográficas dos ônibus. |

## 🗄️ Banco de dados

O projeto utiliza PostgreSQL hospedado na plataforma Neon, com o Prisma ORM para realizar a comunicação entre a aplicação e o banco de dados.

As principais entidades são:

- Rota
- Ônibus
- Parada
- Localização
- Usuário

A conexão com o banco é configurada por meio de variáveis de ambiente, armazenadas no arquivo `.env`.

**Importante:** o arquivo `.env` não deve ser enviado ao GitHub, pois contém informações privadas de conexão. Utilize um arquivo `.env.example` para apresentar as variáveis necessárias sem expor credenciais.

## 🚀 Como executar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/eduardoavv/SeuOnibus-SuaRota.git
```

### 2. Entrar na pasta do backend

```bash
cd SeuOnibus-SuaRota/backend
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Configurar as variáveis de ambiente

Crie o arquivo `.env` com as configurações de conexão com o banco PostgreSQL/Neon.

### 5. Gerar o Prisma Client

```bash
npx prisma generate
```

### 6. Executar a aplicação

```bash
npm run start:dev
```

Após iniciar, a API estará disponível em:

```text
http://localhost:3000
```

## 🧪 Testes

Para executar os testes:

```bash
npm test
```

Para verificar a compilação:

```bash
npm run build
```

## 👥 Equipe de desenvolvimento

- **Eduardo Artur**
- **Emerson Souza**
- **Marjory Leticia**

Projeto desenvolvido em equipe como atividade acadêmica do curso de Análise e Desenvolvimento de Sistemas.

## 📚 Documentação

A documentação complementar do projeto está disponível na pasta `docs/`.

---

**Seu Ônibus, Sua Rota — No Ponto**

*Seu ônibus. Sua rota. Seu tempo.*
