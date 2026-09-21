# API de Convidados

API REST desenvolvida em **NestJS** para gerenciamento de convidados (CRUD completo). Este README explica como rodar o projeto e como testar cada rota usando **Postman** ou **Insomnia**.

## Sumário

- [Modelo de dados](#modelo-de-dados)
- [Como rodar o projeto](#como-rodar-o-projeto)
- [Base URL](#base-url)
- [Endpoints](#endpoints)
  - [GET /convidados](#get-convidados)
  - [GET /convidados/filtrar](#get-convidadosfiltrar)
  - [POST /convidados](#post-convidados)
  - [PATCH /convidados/:id](#patch-convidadosid)
  - [PUT /convidados/:id](#put-convidadosid)
  - [DELETE /convidados/:id](#delete-convidadosid)
- [Testando com Postman](#testando-com-postman)
- [Testando com Insomnia](#testando-com-insomnia)

## Modelo de dados

Cada convidado segue esta estrutura (`Convidado`):

```json
{
  "id": 1,
  "nome": "Emanoel",
  "idade": 19
}
```

## Como rodar o projeto

```bash
# instalar dependências
npm install

# rodar em modo desenvolvimento
npm run start:dev
```

Por padrão o NestJS sobe o servidor em `http://localhost:3000`.

## Base URL

```
http://localhost:3000/convidados
```

Todas as rotas abaixo usam essa base.

## Endpoints

### GET /convidados

Retorna a lista completa de convidados.

| Método | Rota          |
|--------|---------------|
| GET    | `/convidados` |

**Exemplo de resposta:**
```json
[
  { "id": 1, "nome": "Emanoel", "idade": 19 },
  { "id": 2, "nome": "Henry", "idade": 18 },
  { "id": 3, "nome": "Isaac", "idade": 0 }
]
```

### GET /convidados/filtrar

Retorna os convidados que possuem a idade informada via **query param**.

| Método | Rota                    |
|--------|-------------------------|
| GET    | `/convidados/filtrar`   |

**Query param obrigatório:**
- `idade` (número)

**Exemplo de URL:**
```
GET http://localhost:3000/convidados/filtrar?idade=18
```

### POST /convidados

Cria um novo convidado.

| Método | Rota          |
|--------|---------------|
| POST   | `/convidados` |

**Body (JSON):**
```json
{
  "id": 4,
  "nome": "Maria",
  "idade": 22
}
```

**Exemplo de resposta:**
```json
{
  "mensagem": "Usuário Maria cadastrado com sucesso",
  "dados": {
    "id": 4,
    "nome": "Maria",
    "idade": 22
  }
}
```

### PATCH /convidados/:id

Atualiza **apenas a idade** de um convidado existente.

| Método | Rota                |
|--------|---------------------|
| PATCH  | `/convidados/:id`   |

**Parâmetro de rota:**
- `id` (número) — id do convidado a ser atualizado

**Body (JSON):**
```json
{
  "idade": 20
}
```

**Exemplo de URL:**
```
PATCH http://localhost:3000/convidados/1
```

### PUT /convidados/:id

Substitui todas as informações de um convidado existente.

| Método | Rota                |
|--------|---------------------|
| PUT    | `/convidados/:id`   |

**Parâmetro de rota:**
- `id` (número) — id do convidado a ser substituído

**Body (JSON):**
```json
{
  "id": 1,
  "nome": "Emanoel Souza",
  "idade": 20
}
```

**Exemplo de URL:**
```
PUT http://localhost:3000/convidados/1
```

> ⚠️ Se o `id` não existir, a API retorna `404 Not Found` com a mensagem `"Convidado não encontrado"`.

### DELETE /convidados/:id

Remove um convidado pelo id.

| Método | Rota                |
|--------|---------------------|
| DELETE | `/convidados/:id`   |

**Parâmetro de rota:**
- `id` (número) — id do convidado a ser removido

**Exemplo de URL:**
```
DELETE http://localhost:3000/convidados/2
```

---

## Testando com Postman

1. Abra o Postman e clique em **New > HTTP Request**.
2. Selecione o **método HTTP** (GET, POST, PATCH, PUT ou DELETE) no menu suspenso ao lado da URL.
3. Digite a URL da rota, por exemplo:
   ```
   http://localhost:3000/convidados
   ```
4. Para rotas que precisam de **corpo (body)**, como `POST`, `PATCH` e `PUT`:
   - Vá até a aba **Body**.
   - Selecione a opção **raw**.
   - No dropdown ao lado, escolha **JSON**.
   - Cole o JSON correspondente (veja os exemplos acima).
5. Para a rota `GET /convidados/filtrar`, vá até a aba **Params** e adicione:
   - Key: `idade`
   - Value: `18` (ou o valor desejado)
6. Clique em **Send** para enviar a requisição.
7. A resposta da API aparecerá na parte inferior da tela, com o status HTTP e o corpo da resposta em JSON.

**Dica:** você pode criar uma **Collection** no Postman com todas essas requisições já configuradas, para reutilizar sempre que precisar testar a API.

## Testando com Insomnia

1. Abra o Insomnia e clique em **New Request** (ou use `Ctrl+N`).
2. Dê um nome à requisição e selecione o **método HTTP** desejado.
3. Digite a URL da rota, por exemplo:
   ```
   http://localhost:3000/convidados/1
   ```
4. Para rotas com corpo (`POST`, `PATCH`, `PUT`):
   - Clique na aba **Body**, logo abaixo da URL.
   - Selecione **JSON**.
   - Cole o JSON com os dados (veja os exemplos acima).
5. Para a rota de filtro (`GET /convidados/filtrar`):
   - Você pode digitar a query direto na URL:
     ```
     http://localhost:3000/convidados/filtrar?idade=18
     ```
   - Ou usar a aba **Query** para adicionar o parâmetro `idade` separadamente.
6. Clique no botão **Send** (seta roxa) para disparar a requisição.
7. O resultado será exibido no painel à direita, mostrando status, tempo de resposta e o JSON retornado.

**Dica:** organize as requisições em uma **Workspace** ou **Folder** dentro do Insomnia para manter tudo relacionado ao projeto Convidados em um só lugar.

---

## Resumo rápido das rotas

| Método | Rota                          | Descrição                              |
|--------|-------------------------------|-----------------------------------------|
| GET    | `/convidados`                 | Lista todos os convidados               |
| GET    | `/convidados/filtrar?idade=N` | Filtra convidados por idade             |
| POST   | `/convidados`                 | Cria um novo convidado                  |
| PATCH  | `/convidados/:id`             | Atualiza a idade de um convidado        |
| PUT    | `/convidados/:id`             | Substitui os dados de um convidado      |
| DELETE | `/convidados/:id`             | Remove um convidado                     |