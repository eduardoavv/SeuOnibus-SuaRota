# Entidade Ônibus — SeuOnibus-SuaRota

## Sobre

A entidade Ônibus faz parte do sistema SeuOnibus-SuaRota, uma aplicação desenvolvida para permitir o acompanhamento de ônibus escolares, suas rotas e localizações.

O módulo é responsável pelo cadastro, consulta, atualização e exclusão dos ônibus registrados no sistema.

## Tecnologias utilizadas

- TypeScript
- NestJS
- TypeORM
- PostgreSQL
- Neon PostgreSQL

O TypeORM é utilizado para o mapeamento das entidades e o acesso ao banco de dados PostgreSQL.

## Estrutura do módulo

```text
onibus/
├── dto/
│   ├── create-onibus.dto.ts
│   └── update-onibus.dto.ts
├── onibus.controller.ts
├── onibus.module.ts
├── onibus.service.ts
└── README.md
```

## Entidade Ônibus

A entidade é mapeada pela classe `Onibus`, localizada em:

```text
backend/src/database/entities/onibus.entity.ts
```

### Campos

| Campo | Tipo | Descrição |
|---|---|---|
| id | Integer | Identificador único |
| placa | String | Placa do ônibus |
| identificacaoRFID | String | Identificação RFID do veículo |
| modelo | String | Modelo do ônibus |
| status | String | Situação do ônibus |
| rotaId | Integer ou nulo | Identificador da rota associada |

O campo `status` utiliza os valores definidos pelo sistema: `ATIVO`, `INATIVO` e `MANUTENCAO`.

O campo `rotaId` permite associar um ônibus a uma rota. Essa associação é opcional.

## Endpoints

| Método | Endpoint | Descrição |
|---|---|---|
| POST | `/onibus` | Cadastrar ônibus |
| GET | `/onibus` | Listar ônibus |
| GET | `/onibus/:id` | Consultar ônibus por ID |
| PATCH | `/onibus/:id` | Atualizar ônibus |
| DELETE | `/onibus/:id` | Excluir ônibus |

## Exemplo de cadastro

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

## Banco de dados

O projeto utiliza PostgreSQL hospedado no Neon.

As configurações de conexão são definidas por variáveis de ambiente:

```env
DATABASE_URL="sua_conexao_pooler_do_neon"
DIRECT_URL="sua_conexao_direta_do_neon"
```

O arquivo `.env` contém informações privadas e não deve ser enviado ao repositório. Utilize o `.env.example` como referência de configuração.

## Organização da persistência

As entidades e configurações do banco estão organizadas em:

```text
backend/src/database/
├── entities/
├── migrations/
├── data-source.ts
├── postgres-exception.filter.ts
└── seed.ts
```

As migrations são utilizadas para controlar alterações na estrutura do banco de dados, enquanto o seed permite inserir dados iniciais.

## Equipe

O projeto é desenvolvido colaborativamente por:

- Eduardo Artur
- Emerson Sousa
- Marjory Letícia

**Responsável original pela entidade Ônibus:** Marjory Letícia.
