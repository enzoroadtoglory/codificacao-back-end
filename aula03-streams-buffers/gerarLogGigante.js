import fs from 'fs';

const streamEscrita = fs.createWriteStream("servidor.log");
console.log("Gerando arquivo de log simulado...");

for(let i = 0; i < 200000; i++){
    const tipo = i % 7 === 0 ? 'ERROR' : 'INFO';
    streamEscrita.write(`[2026-09-11] Linha ${i}: Status 200 - Mensagem de teste ${tipo}\n`);
}
streamEscrita.end();