# 🚌 Seu Ônibus, Sua Rota — No Ponto

**Seu ônibus. Sua rota. Seu tempo.**

O **No Ponto** é um sistema desenvolvido para acompanhar ônibus públicos e escolares, permitindo o gerenciamento de veículos, rotas, paradas, usuários e localizações. O objetivo é facilitar o acompanhamento dos transportes e oferecer informações que ajudem os passageiros a organizar melhor seus deslocamentos.

## 🎯 Objetivos do projeto

- Gerenciar os ônibus cadastrados no sistema.
- Identificar veículos por meio de RFID.
- Cadastrar e organizar rotas e paradas.
- Registrar a localização dos ônibus por GPS.
- Gerenciar usuários e suas rotas favoritas.

## 🛠️ Tecnologias utilizadas

- **TypeScript** — linguagem de programação.
- **Node.js** — ambiente de execução.
- **NestJS** — framework do backend.
- **Prisma ORM** — gerenciamento do banco de dados.
- **PostgreSQL** — sistema gerenciador de banco de dados.
- **Neon** — hospedagem do PostgreSQL.
- **bcrypt** — proteção de senhas.

## 📁 Estrutura do projeto

```text
SeuOnibus-SuaRota/
│
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   ├── schema.prisma
│   │   └── seed.js
│   │
│   ├── src/
│   │   ├── onibus/
│   │   ├── usuarios/
│   │   ├── rotas/
│   │   ├── paradas/
│   │   ├── localizacao/
│   │   ├── prisma/
│   │   ├── app.module.ts
│   │   └── main.ts
│   │
│   └── package.json
│
├── docs/
│   └── modelo-de-dados.md
│
├── avaliacao/
└── README.md
```

## ⚙️ Módulos do sistema

| Módulo | Responsabilidade |
|---|---|
| Ônibus | Cadastro, consulta, atualização e remoção de veículos. |
| Usuários | Gerenciamento de usuários e senhas protegidas com bcrypt. |
| Rotas | Gerenciamento das rotas de transporte. |
| Paradas | Cadastro e gerenciamento dos pontos de parada. |
| Localização | Registro das coordenadas geográficas dos ônibus. |

## 🗄️ Banco de dados

O projeto utiliza PostgreSQL hospedado na plataforma Neon, com o Prisma ORM para comunicação entre a aplicação e o banco de dados.

As principais entidades são:

- **Rota**
- **Ônibus**
- **Parada**
- **Localização**
- **Usuário**
- **UsuarioFavoritaRota**

A entidade `UsuarioFavoritaRota` representa o relacionamento muitos-para-muitos (N:N) entre usuários e rotas, permitindo que usuários mantenham rotas favoritas.

### Variáveis de ambiente

A conexão com o banco é configurada por meio de variáveis de ambiente no arquivo `.env`, localizado na pasta `backend`.

Exemplo de configuração:

```env
DATABASE_URL="postgresql://USUARIO:SENHA@HOST/BANCO?sslmode=require"
DIRECT_URL="postgresql://USUARIO:SENHA@HOST/BANCO?sslmode=require"
```

Substitua os valores de exemplo pelas credenciais fornecidas para o ambiente de desenvolvimento.

**Importante:** nunca compartilhe ou envie o arquivo `.env` ao GitHub. Ele contém informações privadas de conexão.

## 🚀 Como executar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/eduardoavv/SeuOnibus-SuaRota.git
```

### 2. Acessar o backend

```bash
cd SeuOnibus-SuaRota/backend
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Configurar as variáveis de ambiente

Crie o arquivo `.env` na pasta `backend`, utilizando as variáveis `DATABASE_URL` e `DIRECT_URL`.

### 5. Gerar o Prisma Client

```bash
npx prisma generate
```

### 6. Aplicar as migrations

Para aplicar migrations já existentes no projeto:

```bash
npx prisma migrate deploy
```

Antes de executar esse comando no banco oficial, confirme que o histórico das migrations está validado e compatível com a estrutura existente.

### 7. Popular o banco com dados de exemplo

```bash
npm run seed
```

O comando executa o arquivo `prisma/seed.js`, responsável por inserir dados de exemplo.

**Atenção:** execute o seed somente em ambientes de desenvolvimento ou teste, nunca no banco de produção sem autorização e avaliação prévia.

### 8. Iniciar a aplicação

```bash
npm run start:dev
```

Após iniciar, a API estará disponível em:

```text
http://localhost:3000
```

## 🧪 Testes e validação

Os seguintes comandos estão disponíveis no backend:

Executar testes:

```bash
npm test
```

Executar testes de integração:

```bash
npm run test:e2e
```

Verificar a compilação:

```bash
npm run build
```

Verificar o código:

```bash
npm run lint
```

Os resultados dos testes devem ser registrados na documentação do projeto após sua execução em um ambiente compatível.

## 📚 Documentação complementar

A pasta `docs/` contém a documentação técnica do projeto, incluindo:

- `modelo-de-dados.md`: diagrama entidade-relacionamento, relacionamentos, chaves estrangeiras e regras de integridade.

## 👥 Equipe de desenvolvimento

- **Eduardo Artur**
- **Emerson Sousa**
- **Marjory Leticia**

Projeto desenvolvido em equipe como atividade acadêmica do curso de Análise e Desenvolvimento de Sistemas.

---

**Seu Ônibus, Sua Rota — No Ponto**

*Seu ônibus. Sua rota. Seu tempo.*