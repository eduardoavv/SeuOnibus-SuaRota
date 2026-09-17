# Canvas do Projeto

> Preencha em **uma página**. Se não couber, o escopo está grande demais.
> Etapa 1 · Substitua os textos entre `<>`.

**Projeto:** `<nome>` · **Equipe:** `<integrantes>` · **Data:** `<AAAA-MM-DD>`
**Organização parceira:** `<nome da organização>`

---

## 1. Problema

> Na `<organização>`, `<quem>` precisa `<fazer o quê>`, mas hoje `<como é feito>`, o que
> causa `<qual consequência>`.

**Evidências de que o problema existe** (dados, falas, observação):

-
-

## 2. Quem é afetado

| Quem | Quantas pessoas | Como é afetado hoje |
|---|---|---|
| | | |

## 3. Solução proposta

Em duas frases, sem jargão técnico:

>

## 4. Funcionalidades do MVP (3 a 5)

| # | Funcionalidade | Para quem | Por que é essencial |
|---|---|---|---|
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |


## 5. Fora do escopo

O que **não faremos** nesta versão, e por quê:

| Não faremos                                    | Por quê                                                                                             |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Compra ou pagamento de passagens               | Não faz parte do objetivo principal do projeto.                                                     |
| Controle financeiro das empresas de transporte | O foco do sistema é o acompanhamento dos ônibus e das rotas.                                        |
| Manutenção física dos ônibus                   | O sistema será responsável apenas pelo acompanhamento e gerenciamento das informações dos veículos. |
| Aplicativo mobile                              | Nesta primeira versão, será desenvolvida uma plataforma web.                                        |
| Rastreamento de outros tipos de veículos       | O projeto será focado no acompanhamento de ônibus públicos e escolares.                             |

## 6. Usuários e papéis

| Papel                         | O que pode fazer                                                                 |
| ----------------------------- | -------------------------------------------------------------------------------- |
| Estudante                     | Consultar o ônibus escolar, sua rota, localização e previsão de chegada.         |
| Usuário do transporte público | Consultar linhas, rotas, localização do ônibus e previsão de chegada.            |
| Responsável                   | Acompanhar informações sobre o transporte escolar e o deslocamento do estudante. |
| Escola/Empresa de transporte  | Visualizar ônibus, rotas e veículos em operação.                                 |
| Administrador                 | Cadastrar e gerenciar usuários, ônibus, rotas e informações do sistema.          |

## 7. Restrições

| Tipo            | Restrição                                                          |
| --------------- | ------------------------------------------------------------------ |
| Prazo           | Semana 18                                                          |
| Equipe          | 3 pessoas,  8h/semana no total                             |
| Técnica         | TypeScript (NestJS + React), PostgreSQL, PaaS gratuita             |
| Contexto de uso | Sistema utilizado por computador ou celular com acesso à internet. |
| Orçamento       | Zero, utilizando ferramentas e serviços gratuitos.                 |


## 8. Riscos principais

**Risco** | **O que faremos**
Localização do ônibus apresentar erro | Atualizar a localização periodicamente e informar quando estiver desatualizada.
Falha de internet | Exibir a última localização registrada enquanto aguarda nova atualização.
Previsão de chegada imprecisa | Atualizar a estimativa conforme a localização e o andamento da rota.
Dificuldade de integração com RFID/GPS | Utilizar dados simulados no MVP.


## 9. Critérios de sucesso

Objetivo: Acompanhar os ônibus em tempo real
Como mediremos: Teste da localização dos ônibus no mapa
Meta: 100% dos ônibus cadastrados visíveis

Objetivo: Informar o horário previsto de chegada
Como mediremos: Teste das previsões de chegada nas rotas
Meta: Previsão disponível para todas as rotas ativas

Objetivo: Facilitar o acompanhamento pelo usuário
Como mediremos: Testes de uso com usuários
Meta: Usuário conseguir localizar o ônibus e consultar a previsão sem auxílio

## 10. O que fica depois

Quem opera o sistema: Escola, empresa de transporte ou órgão responsável pelo transporte.
Quem mantém tecnicamente: Equipe responsável pelo desenvolvimento do sistema.
Custo mensal estimado: Zero no MVP, utilizando serviços gratuitos.
Licença do código: A definir pela equipe.
