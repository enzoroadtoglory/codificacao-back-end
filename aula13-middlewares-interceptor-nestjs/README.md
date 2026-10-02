Nesta aula, foi desenvolvido um projeto com NestJS para demonstrar o uso de middlewares para interceptar requisições antes que elas cheguem às rotas da aplicação.

A ideia principal foi criar uma camada de controle que registra informações da requisição e valida o acesso a determinadas rotas. Para isso, foi criado um middleware chamado LoggerMiddleware, responsável por:

capturar o método HTTP da requisição
identificar a rota acessada
registrar no console os dados da requisição
verificar headers específicos para permitir ou bloquear o acesso
Também foram criadas rotas no controller para simular acesso público e acesso restrito:

GET / → rota pública
GET /admin → rota administrativa
GET /secret → rota secreta
No middleware, a lógica foi a seguinte:

Se a rota for /admin, o sistema verifica o header x-user-role.
Caso o valor não seja administrator, a requisição é bloqueada com status 403 e uma mensagem de acesso negado.
Se a rota for /secret, o sistema verifica o header x-secret-role.
Caso o valor não seja secret, a requisição é bloqueada com status 404.
Se os dados estiverem corretos, a requisição segue normalmente para a rota correspondente, utilizando o método next().

Com isso, a aula mostrou na prática como usar middleware no NestJS para:

logar requisições
controlar acesso
proteger endpoints
aplicar regras de autorização antes da execução da rota
Essa abordagem é muito útil em aplicações reais, pois ajuda a manter a API mais segura, organizada e fácil de monitorar.