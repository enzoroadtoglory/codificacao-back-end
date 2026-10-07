# Aula 15

API REST simples feita com [NestJS](https://nestjs.com/) para listar produtos e buscar um produto pelo ID. O foco do projeto é praticar a **estrutura Controller + Service** e o **tratamento de erros HTTP** (status codes `400` e `404`) com as exceções nativas do Nest e o `Logger`.

## O que foi feito

- **`ProdutosService`** — camada de serviço (`@Injectable`) que guarda uma lista de produtos em memória e expõe o método `listarProdutos()`.
- **`ProdutosController`** — camada de controle (`@Controller('produtos')`) que recebe as requisições HTTP, valida o parâmetro e devolve a resposta.
- **Validação do ID** — o ID recebido na URL é convertido para número; se não for numérico, a API responde `400 Bad Request`.
- **Produto não encontrado** — se nenhum produto tiver o ID informado, a API responde `404 Not Found`.
- **Logs** — o `Logger` do Nest registra um aviso (`warn`) sempre que ocorre um dos erros acima.

## Estrutura

```
src/
└── produtos/
    ├── produtos.controller.ts   # rotas e tratamento de erros
    ├── produtos.service.ts      # dados e regra de negócio
    └── produtos.module.ts       # módulo que registra controller e service
```

> O `ProdutosModule` precisa estar importado no `AppModule` para as rotas funcionarem.

## Dados disponíveis

Os produtos ficam em memória (não há banco de dados):

| id | nome              | preço   |
|----|-------------------|---------|
| 1  | Teclado mecânico  | 120.90  |
| 2  | Mouse Gamer       | 99.99   |
| 3  | Monitor 144hz     | 780.76  |
| 4  | Cadeira Gamer     | 499.99  |

> Os dados são reiniciados toda vez que a aplicação é reiniciada.

## Como executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado
- npm (já vem com o Node)

### Passo a passo

```bash
# 1. instalar as dependências
npm install

# 2. iniciar em modo de desenvolvimento (recarrega ao salvar)
npm run start:dev
```

Por padrão, a aplicação fica disponível em `http://localhost:3000`.

## Como usar a API

### `GET /produtos`

Retorna a lista completa de produtos.

```bash
curl http://localhost:3000/produtos
```

**Resposta — `200 OK`**

```json
[
  { "id": 1, "nome": "Teclado mecânico", "preco": 120.9 },
  { "id": 2, "nome": "Mouse Gamer", "preco": 99.99 },
  { "id": 3, "nome": "Monitor 144hz", "preco": 780.76 },
  { "id": 4, "nome": "Cadeira Gamer", "preco": 499.99 }
]
```

### `GET /produtos/:id`

Retorna um único produto pelo ID.

```bash
curl http://localhost:3000/produtos/2
```

**Resposta — `200 OK`**

```json
{ "id": 2, "nome": "Mouse Gamer", "preco": 99.99 }
```

## Tratamento de erros

| Situação                     | Exemplo de requisição           | Status | Exceção usada            |
|------------------------------|---------------------------------|--------|--------------------------|
| ID não numérico              | `GET /produtos/abc`             | `400`  | `BadRequestException`    |
| ID inexistente               | `GET /produtos/99`              | `404`  | `NotFoundException`      |

**`400 Bad Request`** — `GET /produtos/abc`

```json
{
  "message": "ID inválido. Precisa ser numérico",
  "error": "Bad Request",
  "statusCode": 400
}
```

**`404 Not Found`** — `GET /produtos/99`

```json
{
  "message": "Produto com id 99 não localizado",
  "error": "Not Found",
  "statusCode": 404
}
```

### Logs no terminal

Cada erro também gera um aviso no console da aplicação:

```
[ProdutosController] Tentativa de busca com ID não numérico
[ProdutosController] Produto com id 99 não encontrado
```

## Conceitos praticados

- Controllers, Services e injeção de dependência (`@Injectable`, `constructor`)
- Decorators de rota: `@Controller`, `@Get`, `@Param`
- Exceções HTTP do Nest: `BadRequestException` (400) e `NotFoundException` (404)
- Logs com `Logger`

## Próximos passos (ideias)

- Adicionar rotas `POST`, `PUT` e `DELETE`
- Validar dados com `class-validator` e `ParseIntPipe`
- Conectar a um banco de dados em vez de usar lista em memória