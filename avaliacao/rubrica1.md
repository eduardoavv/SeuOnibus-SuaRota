# Rubrica — Etapa 1: Definição e planejamento

> **Peso:** 15% · **Entrega:** semana 10  
> **Avaliação preliminar baseada nos arquivos visíveis no repositório em 20/10/2026.** Os níveis são uma estimativa para revisão da equipe, não uma nota oficial.

**Equipe:** Eduardo Artur, Emerson Sousa, Marjory Leticia  
**Data da análise:** 2026-10-20

## Pré-requisitos (sim/não)

| Verificação | Situação encontrada |
| --- | --- |
| Organização parceira externa, com aceite por escrito | **Não comprovado no repositório.** O canvas cita “Transporte escolar municipal”, mas não foi localizada carta de anuência ou e-mail de aceite. |
| Houve ao menos uma conversa com a organização sobre o problema | **Não comprovado no repositório.** O canvas apresenta o problema e evidências gerais, mas não registra uma conversa nem seus resultados. |
| Acordo de equipe com papéis e *Definition of Done* | **Não comprovado no repositório.** O canvas descreve papéis de usuários do sistema, mas não um acordo interno da equipe. |

> **Atenção:** confirmar esses três itens com a equipe e anexar as evidências necessárias antes de marcar “Sim”.

## Critérios

| Critério | Peso | Nível sugerido | Justificativa baseada no repositório |
| --- | ---: | :---: | --- |
| **1. Problema e demanda** | 2,0 | **2 — Em desenvolvimento** | O canvas descreve a dificuldade de saber se o ônibus passou ou está próximo e as consequências para os usuários. Porém, não apresenta evidências documentadas de conversa com a organização parceira. |
| **2. Usuários e cenário** | 1,5 | **2 — Em desenvolvimento** | Há identificação de alunos, usuários do transporte público, responsáveis, escola/empresa e administrador. Ainda não aparecem 2–3 personas baseadas em pessoas reais nem um cenário principal passo a passo. |
| **3. Escopo e sucesso** | 2,0 | **3 — Adequado** | O canvas lista cinco funcionalidades para o MVP, define itens fora do escopo e apresenta critérios de sucesso. Algumas metas são verificáveis, mas poderiam incluir medidas numéricas e um método de teste mais específico. |
| **4. Backlog** | 1,5 | **1 — Insuficiente** | Não foi localizado um backlog com histórias de usuário, critérios de aceite, estimativas e priorização MoSCoW nos arquivos consultados. |
| **5. Desenho técnico da API** | 2,0 | **2 — Em desenvolvimento** | O schema Prisma apresenta os modelos `Rota`, `Onibus` e `Parada` e suas relações. O código também apresenta rotas CRUD para ônibus e paradas. Não foi localizado um contrato completo da API com status e erros, matriz de papéis × rotas ou ADRs documentados. |
| **6. Plano de execução** | 1,0 | **2 — Em desenvolvimento** | O canvas informa o prazo até a semana 18 e apresenta riscos com ações de resposta. Não foi localizado um cronograma detalhado das semanas 11–18 com entregas e responsáveis. |
| **Total** | **10** | | |

**Nota estimada:** (2×2,0 + 2×1,5 + 3×2,0 + 1×1,5 + 2×2,0 + 2×1,0) ÷ 4 = **5,125/10**.

> Esta estimativa considera somente o material que foi possível verificar. A nota pode mudar se a equipe apresentar outros documentos, especialmente evidências da organização, acordo de equipe, backlog e ADRs.

## Sinais de alerta

- [ ] A solução foi escolhida antes de conhecer o problema — **não é possível concluir apenas pelo repositório**.
- [ ] Ninguém da equipe falou diretamente com a organização — **confirmar com a equipe; não há evidência registrada nos arquivos consultados**.
- [ ] Tema idêntico ao de outra equipe — **não verificável pelo repositório**.
- [ ] Local de uso sem internet ou equipamento compatível, e a equipe não percebeu — o canvas prevê uso com internet; validar as condições reais com a organização.

## Devolutiva

**Pontos fortes:**
- Problema e público afetado estão descritos no canvas.
- O MVP tem cinco funcionalidades e explicita o que ficará fora do escopo.
- Há critérios de sucesso e riscos iniciais.
- O modelo de dados e parte da API já começaram a ser implementados.

**O que ajustar antes da Etapa 2:**
- Registrar a conversa com a organização e anexar a evidência de aceite por escrito.
- Documentar o acordo interno da equipe, incluindo papéis e *Definition of Done*.
- Criar personas e um cenário principal passo a passo.
- Criar backlog com histórias de usuário, critérios de aceite, estimativas e prioridade MoSCoW.
- Documentar contrato da API, status/erros principais, matriz de permissões e pelo menos um ADR.
- Detalhar cronograma das semanas 11–18 com responsáveis e planos B para os riscos.

**Escopo aprovado?** ☒ Sim, com redução/ajustes — **sugestão preliminar**, sujeita à confirmação dos pré-requisitos pelo avaliador.
