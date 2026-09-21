import os from 'os';

console.log('Plataforma: ', os.platform());
console.log('Memoria total: ', os.totalmem());
console.log('CPUs: ', os.cpus().length);