import fs from 'fs';
import readline from 'readline';

async function filtrarErros() {

    console.log("Iniciando processamento com streams!");
    exibirConsumoMemoria("Início");

    const streamLeitura = fs.createReadStream('servidor.log');
    const streamEscrita = fs.createWriteStream('apenas_erros.log');
    const leitorLinha = readline.createInterface({input:streamLeitura, crlfDelay: Infinity});
    
    let totalErros = 0;
    for await(const linha of leitorLinha) {
        if(linha.includes('ERROR')){
            streamEscrita.write(linha + '\n');
            totalErros++;
        }
    }

    console.log(`Linhas encontradas com erros: ${totalErros} linhas`);
    exibirConsumoMemoria('Fim');

}

function exibirConsumoMemoria(consumo){
    const memoria = process.memoryUsage();
    const rssMB = (memoria.rss / 1024 /1024).toFixed(2);
    const heapMB = (memoria.heapUsed / 1024 / 1024).toFixed(2);

    console.log(`[${consumo}] RSS: ${rssMB} MB | Heap Utilizado: ${heapMB}`);
}

filtrarErros();
