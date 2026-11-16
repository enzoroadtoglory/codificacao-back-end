/**
 * Aula 06 - Operadores de Consulta Avançados no MongoDB
 * Operadores: $in, $nin, $exists, $regex, $elemMatch
 *
 * Como executar:
 *   mongosh escola_db consultas-avancadas.js        (imprime as consultas rodando)
 *   ou copie cada bloco no MongoDB Compass / mongosh.
 *
 * Observação: os "Resultado esperado" descrevem o que cada consulta deve
 * retornar com base na lógica do operador. As quantidades exatas dependem dos
 * dados de cada banco (anote os números reais ao executar).
 *
 * Coleções do exercício: usuarios, produtos, pedidos, clientes, restaurantes
 * Coleção da API (escola-api): alunos  -> ver seção "API escola-api" no fim.
 */

// =====================================================================
// EXERCÍCIOS DA AULA (1 a 9)
// =====================================================================

// ---------------------------------------------------------------------
// Exercício 1 - $in: usuários de São Paulo, Rio de Janeiro ou Belo Horizonte
// Resultado esperado: só usuários com cidade em uma dessas 3. Adicionar uma
// cidade inexistente à lista não gera erro nem altera o resultado.
// ---------------------------------------------------------------------
db.usuarios.find({
  cidade: { $in: ["São Paulo", "Rio de Janeiro", "Belo Horizonte"] },
});

// ---------------------------------------------------------------------
// Exercício 2 - $nin: idade diferente de 18 e 20 (depois, também 25)
// Resultado esperado: usuários com outras idades E usuários sem o campo
// "idade" (comportamento esperado do $nin).
// ---------------------------------------------------------------------
db.usuarios.find({ idade: { $nin: [18, 20] } });
db.usuarios.find({ idade: { $nin: [18, 20, 25] } });

// ---------------------------------------------------------------------
// Exercício 3 - $exists: com e sem telefone
// Resultado esperado: (com telefone) + (sem telefone) = total da coleção.
// Conferir com db.usuarios.countDocuments().
// ---------------------------------------------------------------------
db.usuarios.find({ telefone: { $exists: true } });
db.usuarios.find({ telefone: { $exists: false } });

// ---------------------------------------------------------------------
// Exercício 4 - $regex: nome contém "Jo" (sem distinção de maiúsculas)
// Resultado esperado: João, Jonas, jose, ... (qualquer nome com "jo").
// ---------------------------------------------------------------------
db.usuarios.find({ nome: { $regex: "Jo", $options: "i" } });

// ---------------------------------------------------------------------
// Exercício 5 - $regex: nome começa com "Ana" (^)
// Resultado esperado: Ana, Ana Clara, Anabela... (não retorna "Mariana").
// ---------------------------------------------------------------------
db.usuarios.find({ nome: { $regex: "^Ana" } });

// Desafio extra: e-mail termina com "@gmail.com" ($)
// Resultado esperado: apenas e-mails do Gmail (o ponto é escapado: \\.).
db.usuarios.find({ email: { $regex: "@gmail\\.com$", $options: "i" } });

// ---------------------------------------------------------------------
// Exercício 6 - Arrays simples (tags)
// Resultado esperado: (1) produtos com a tag "oferta"; (2) produtos que têm
// "portátil" OU "oferta" entre as tags. Igualdade em array compara com
// qualquer elemento.
// ---------------------------------------------------------------------
db.produtos.find({ tags: "oferta" });
db.produtos.find({ tags: { $in: ["portátil", "oferta"] } });

// ---------------------------------------------------------------------
// Exercício 7 - $elemMatch: item "Notebook" com preço > 2000 NO MESMO item
// Resultado esperado: só pedidos em que o próprio Notebook custa > 2000.
// ---------------------------------------------------------------------
db.pedidos.find({
  itens: { $elemMatch: { produto: "Notebook", preco: { $gt: 2000 } } },
});

// Sem $elemMatch: os critérios podem ser satisfeitos por itens DIFERENTES.
// Resultado esperado: pode trazer pedidos a mais (Notebook barato + outro
// item caro), mostrando por que o $elemMatch é necessário.
db.pedidos.find({ "itens.produto": "Notebook", "itens.preco": { $gt: 2000 } });

// ---------------------------------------------------------------------
// Exercício 8 - Combinação: nome começa com J ou A, idade fora de 18/20 e
// com telefone
// Resultado esperado: usuários que atendem às 3 condições ao mesmo tempo
// (AND implícito entre os campos).
// ---------------------------------------------------------------------
db.usuarios.find({
  nome: { $regex: "^[JA]", $options: "i" },
  idade: { $nin: [18, 20] },
  telefone: { $exists: true },
});

// ---------------------------------------------------------------------
// Exercício 9 - Cenário real: e-commerce
// ---------------------------------------------------------------------

// 9.1 Produtos em promoção: categoria Smartphone/Tablet, nome com "Pro" e
// campo "desconto" existente.
// Resultado esperado: ex.: "iPhone 15 Pro" com desconto cadastrado.
db.produtos.find({
  categoria: { $in: ["Smartphone", "Tablet"] },
  nome: { $regex: "Pro", $options: "i" },
  desconto: { $exists: true },
});

// 9.2 Pedidos de alto valor: algum item acima de R$1.500 que NÃO seja da
// categoria "Acessórios" (as duas condições valem para o mesmo item).
// Resultado esperado: pedidos com ao menos um item caro e não-acessório.
db.pedidos.find({
  itens: {
    $elemMatch: { preco: { $gt: 1500 }, categoria: { $nin: ["Acessórios"] } },
  },
});

// 9.3 Clientes prioritários: nome começa com "R", nível diferente de
// "bronze" e endereço cadastrado.
// Resultado esperado: ex.: "Rafael" (ouro/prata) com endereço.
db.clientes.find({
  nome: { $regex: "^R" },
  nivel: { $nin: ["bronze"] },
  endereco: { $exists: true },
});

// =====================================================================
// ATIVIDADE FINAL - Startup de delivery (clientes, restaurantes, pedidos)
// =====================================================================

// 1. $in: clientes de Curitiba, Florianópolis ou Porto Alegre
// Resultado esperado: apenas clientes dessas 3 cidades.
db.clientes.find({
  cidade: { $in: ["Curitiba", "Florianópolis", "Porto Alegre"] },
});

// 2. $nin: restaurantes que não são "FastFood" nem "Pizza"
// Resultado esperado: demais categorias (e restaurantes sem categoria).
db.restaurantes.find({ categoria: { $nin: ["FastFood", "Pizza"] } });

// 3. $exists: pedidos com o campo "avaliacao" preenchido
// Resultado esperado: só pedidos já avaliados.
db.pedidos.find({ avaliacao: { $exists: true } });

// 4. $regex: restaurantes cujo nome contém "Bistr" (Bistrô, Bistro, bistrô...)
// Resultado esperado: restaurantes com "Bistr" no nome, sem distinguir caixa.
db.restaurantes.find({ nome: { $regex: "Bistr", $options: "i" } });

// 5. $elemMatch: pedidos com item de preço acima de R$50
// Resultado esperado: pedidos com ao menos um item com preco > 50.
db.pedidos.find({ itens: { $elemMatch: { preco: { $gt: 50 } } } });

// 6. Consulta combinada (4 operadores: $in, $nin, $regex, $exists):
// restaurantes de Curitiba ou Porto Alegre, que não são FastFood, com nome
// contendo "Bistr" e que tenham o campo "avaliacaoMedia".
// Resultado esperado: poucos restaurantes, todos atendendo às 4 condições.
db.restaurantes.find({
  cidade: { $in: ["Curitiba", "Porto Alegre"] },
  categoria: { $nin: ["FastFood"] },
  nome: { $regex: "Bistr", $options: "i" },
  avaliacaoMedia: { $exists: true },
});

// =====================================================================
// API escola-api - mesmas ideias na coleção "alunos"
// (rotas: GET /alunos com query string; documentadas em /api no Swagger)
// =====================================================================

// $in      -> GET /alunos?cursosIn=Administração,Ciência da Computação
db.alunos.find({ cursos: { $in: ["Administração", "Ciência da Computação"] } });

// $nin     -> GET /alunos?idadesNin=18,20
db.alunos.find({ idade: { $nin: [18, 20] } });

// $exists  -> GET /alunos?comTelefone=true   (ou false)
db.alunos.find({ telefone: { $exists: true } });

// $regex   -> GET /alunos?nome=jo        (contém)
//          -> GET /alunos?nomeComecaCom=Ana   (começa com)
db.alunos.find({ nome: { $regex: "jo", $options: "i" } });
db.alunos.find({ nome: { $regex: "^Ana", $options: "i" } });

// $elemMatch -> GET /alunos?disciplina=Banco de Dados&notaMinima=7
db.alunos.find({
  notas: { $elemMatch: { disciplina: "Banco de Dados", valor: { $gt: 7 } } },
});

// Combinado -> GET /alunos?nomeComecaCom=J&idadesNin=18,20&comTelefone=true
db.alunos.find({
  $and: [
    { nome: { $regex: "^J", $options: "i" } },
    { idade: { $nin: [18, 20] } },
    { telefone: { $exists: true } },
  ],
});
