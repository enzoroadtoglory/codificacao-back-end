import dotenv from 'dotenv';

dotenv.config();

function iniciarAplicacao(){
    const porta = process.env.PORT || 8080;
    const apiKey = process.env.API_KEY_PAGAMENTO; 
    const dbUrl = process.env.DATABASE_URL;

    if(!apiKey){
        console.error('ERRO CRÍTICO: a chave API_KEY_PAGAMENTO não está definida nas variáveis do ambiente...');
        process.exit(1);
    }

    console.log('============ SERVIÇO DE CONFIGURAÇÃO ============');
    console.log(`Servidor rodando na porta: ${porta}`);
    console.log(`Conexão com o Banco de Dados: ${dbUrl}`);
    console.log(`Status da API de pagamento: chave de tamanho ${apiKey.length} autenticado`);

}

iniciarAplicacao();