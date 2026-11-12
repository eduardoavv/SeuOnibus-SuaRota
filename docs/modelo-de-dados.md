# Modelo de Dados — Seu Ônibus, Sua Rota

Este documento apresenta o modelo de dados do projeto Seu Ônibus, Sua Rota, suas regras de negócio, relacionamentos, restrições e evolução da estrutura relacional.

## 1. Diagrama Entidade-Relacionamento

```mermaid
erDiagram
  ROTA ||--o{ ONIBUS : "aloca"
  ROTA ||--o{ PARADA : "possui"
  ONIBUS ||--o{ LOCALIZACAO : "registra"
  USUARIO ||--o{ USUARIO_FAVORITA_ROTA : "favorita"
  ROTA ||--o{ USUARIO_FAVORITA_ROTA : "e favoritada por"

  ROTA {
    Int id PK
    String nome
    String descricao
  }
  ONIBUS {
    Int id PK
    String placa UK
    String identificacaoRFID UK
    String modelo
    StatusOnibus status
    Int rotaId FK
  }
  PARADA {
    Int id PK
    String nome
    Float latitude
    Float longitude
    Int rotaId FK
  }
  LOCALIZACAO {
    Int id PK
    Float latitude
    Float longitude
    DateTime registradaEm
    Int onibusId FK
  }
  USUARIO {
    String id PK
    String nome
    String email UK
    String senha
    TipoUsuario tipo
  }
  USUARIO_FAVORITA_ROTA {
    String usuarioId PK, FK
    Int rotaId PK, FK
    Boolean notificarAtraso
    DateTime criadoEm
  }
```

## 2. Entidades e relacionamentos

- **Rota:** representa uma rota de transporte e pode possuir vários ônibus, paradas e usuários que a favoritam.
- **Onibus:** representa um veículo, identificado por placa e identificação RFID únicas. Pode estar associado a uma rota.
- **Parada:** representa um ponto de embarque ou desembarque, com nome e coordenadas geográficas. Pode estar associada a uma rota.
- **Localizacao:** armazena as coordenadas e a data de registro de cada localização de um ônibus.
- **Usuario:** representa os usuários do sistema, identificados por UUID, com nome, e-mail, senha e tipo de usuário.
- **UsuarioFavoritaRota:** entidade associativa que implementa o relacionamento muitos-para-muitos entre usuários e rotas, permitindo armazenar preferências de notificação e data de criação.

## 3. Evolução do modelo de dados

| Entidade / Campo | Modelo anterior | Modelo atual | Justificativa |
|---|---|---|---|
| Usuario.id | Inteiro autoincremental |