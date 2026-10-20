# Rubrica — Etapa 2: Sistema preliminar

> **Peso:** 10% da nota final · **Entrega:** semana 12  
> **Avaliação preliminar baseada nos arquivos visíveis no repositório em 20/10/2026.** Os níveis são uma estimativa para revisão da equipe, não uma nota oficial.

**Equipe:** Eduardo Artur, Emerson Sousa, Marjory Leticia  
**Avaliador:** A preencher  
**Data da análise:** 2026-10-20

## Pré-requisitos (sim/não)

| Verificação | Situação encontrada |
| --- | --- |
| Repositório acessível, com o código do backend | **Sim.** O repositório é público e contém o backend. |
| Modelo de dados versionado (migrações aplicadas, sem erro) | **Parcial / não comprovado.** O `schema.prisma` está versionado e define três modelos relacionados. Não foi possível confirmar, apenas pelo código consultado, que as migrações foram aplicadas sem erros. |
| Ao menos um endpoint de API funcionando fim a fim (banco → resposta) | **Não comprovado.** Os controllers e services estão implementados, mas não há evidência de execução bem-sucedida fim a fim nos arquivos consultados. |

> **Importante:** antes de marcar os dois últimos itens como “Sim”, a equipe deve executar a aplicação em um ambiente compatível, aplicar/verificar as migrações e testar pelo menos um endpoint conectado ao banco.

## Critérios

| Critério | Peso | Nível sugerido | Justificativa baseada no repositório |
| --- | ---: | :---: | --- |
| **1. Modelo de dados** | 3,0 | **2 — Em desenvolvimento** | O `schema.prisma` contém três modelos (`Rota`, `Onibus` e `Parada`) com relações. Os campos `rotaId` são opcionais e usam `onDelete: SetNull`. A rubrica prevê nível 2 para 3–4 models ou relações confusas; ainda não há cinco ou mais modelos. |
| **2. API e CRUD** | 4,0 | **3 — Adequado** | Os controllers e services de `Onibus` e `Parada` apresentam operações de criação, listagem, busca por ID, atualização e exclusão, com DTOs de entrada. Isso corresponde ao CRUD de dois recursos. Não foi confirmado CRUD completo para `Rota` nem DTOs separados de saída. |
| **3. Validação e consultas** | 2,0 | **1 — Insuficiente** | Os DTOs consultados declaram tipos de campos, mas não foi localizada validação efetiva com regras/decorators de validação. Também não foram identificados filtros ou paginação implementados nos services consultados. |
| **4. Organização do código** | 1,0 | **2 — Em desenvolvimento** | O código está separado em módulos, controllers, services e DTOs, e a lógica de acesso ao Prisma fica nos services. Porém, não foi possível confirmar lint limpo ou testes passando. Há também uma divergência a revisar: o canvas menciona PostgreSQL, enquanto o `schema.prisma` atualmente usa SQLite. |

**Nota estimada:** (2×3,0 + 3×4,0 + 1×2,0 + 2×1,0) ÷ 4 = **5,5/10**.

> A nota é uma estimativa do material inspecionado. O avaliador pode atribuir níveis diferentes após executar o backend e verificar os demais arquivos do repositório.

## Devolutiva

**Pontos fortes:**
- Repositório público com código de backend versionado.
- Modelo Prisma com três entidades e relações entre ônibus, rotas e paradas.
- CRUD de ônibus e paradas organizado em controllers, services e DTOs.
- Uso do Prisma para as operações de persistência.

**O que ajustar antes da Etapa 3 (sistema final):**
- Confirmar e documentar as migrações do banco e testar a API fim a fim.
- Implementar validação real dos dados recebidos (por exemplo, regras para campos obrigatórios, tipos e coordenadas).
- Adicionar testes automatizados e executar lint/build em ambiente compatível.
- Decidir e alinhar o banco de dados: o canvas cita PostgreSQL, mas o schema atual usa SQLite.
- Avaliar se o recurso `Rota` precisa de controller/service e CRUD próprios.
- Considerar DTOs de saída, filtros/paginação e tratamento consistente de erros para IDs inexistentes e dados inválidos.
- Verificar se `node_modules` está sendo versionado desnecessariamente; normalmente devem ficar fora do Git e ser instalados a partir dos arquivos de dependências.

**Aprovado para seguir?** ☒ Sim, com ajustes — **sugestão preliminar**, condicionada à confirmação dos pré-requisitos técnicos.
