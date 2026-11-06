# Canvas do Projeto

**Projeto:** `Seu ônibus, sua rota` · **Equipe:** `Eduardo Artur, Emerson Sousa, Marjory Leticia` · **Data:** `2026-09-18`

**Organização parceira:** `Transporte escolar municipal`

---

## 1. Problema

Na gestão do transporte escolar e público, os usuários precisam saber se o ônibus já passou ou está próximo do ponto de embarque, mas atualmente essa comunicação é feita por grupos de WhatsApp, onde nem todos os usuários têm acesso ou recebem as informações em tempo real.

Isso causa falta de informação, insegurança e dificuldades para os usuários planejarem seu deslocamento.

**Evidências de que o problema existe:**
- Dependência de grupos de WhatsApp para comunicação
- Usuários sem acesso ficam sem informações
- Dificuldade de saber se o ônibus já passou no ponto X

---

## 2. Quem é afetado

| Quem | Quantas pessoas | Como é afetado hoje |
|---|---|---|
| Alunos | ~500 | Podem perder o ônibus ou ficar sem informação sobre chegada |
| Usuários do transporte público | variável | Não conseguem acompanhar a localização do ônibus em tempo real |

---

## 3. Solução proposta

Uma aplicação web que permite aos usuários acompanhar em tempo real a localização do ônibus, verificar sua rota e saber se ele já passou ou está próximo do ponto de embarque.

O sistema também ajudará na organização do deslocamento e redução da incerteza sobre horários.

---

## 4. Funcionalidades do MVP (3 a 5)

| # | Funcionalidade | Para quem | Por que é essencial |
|---|---|---|---|
| 1 | Visualizar localização do ônibus em tempo real | Usuários | Permite acompanhar o deslocamento |
| 2 | Visualizar rota do ônibus | Usuários | Ajuda no planejamento do embarque |
| 3 | Verificar status do ônibus (perto / passou / distante) | Usuários | Reduz incerteza sobre o ponto |
| 4 | Alertas de possível atraso | Usuários | Ajuda na organização do tempo |
| 5 | Estimativa de tempo até o ponto | Usuários | Facilita planejamento do deslocamento |

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
