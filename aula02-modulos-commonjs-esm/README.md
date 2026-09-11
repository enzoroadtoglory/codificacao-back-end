readme_content = """# Sistema de Logging em Node.js (ES Modules)

Um módulo simples, assíncrono e moderno em **Node.js** para registro e formatação de logs do sistema. Desenvolvido utilizando a sintaxe **ES Modules** (`import/export`) e operações assíncronas com `fs/promises`.

---

## 📌 Sumário

- [Visão Geral](#-visão-geral)
- [Funcionalidades](#-funcionalidades)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Como Executar](#-como-executar)
- [Detalhamento do Código](#-detalhamento-do-código)
  - [`utils.js`](#utilsjs)
  - [`index.js`](#indexjs)
- [Exemplo de Saída (`logs/system.log`)](#-exemplo-de-saída-logssystemlog)
- [Boas Práticas e Considerações](#-boas-práticas-e-considerações)

---

## 🔍 Visão Geral

Este projeto demonstra como criar um sistema leve de auditoria e registro de logs em arquivo local usando recursos nativos do Node.js. Ele manipula diretórios automaticamente, formata marcas temporais (*timestamps*) e garante a gravação incremental sem risco de sobrescrever eventos prévios.

---

## ✨ Funcionalidades

- ⏱️ **Formatação de Data e Hora**: Adiciona marcações temporais automáticas no formato `[AAAA-MM-DD HH:MM:SS]`.
- 📁 **Criação Automática de Diretórios**: Garante a existência da pasta `logs/` de forma recursiva via `fs.mkdir`.
- ✍️ **Gravação Incremental (*Append*)**: Utiliza `fs.appendFile` para salvar novas entradas ao final do arquivo `system.log`.
- 📦 **Compatibilidade com ES Modules**: Resolve o caminho de diretório (`__dirname`) em ambientes ESM nativos através da API `import.meta.url`.
- ⚡ **Tratamento Assíncrono de Erros**: Implementado com `async/await` e blocos `try/catch` para captura de erros de I/O.

---

## 📁 Estrutura do Projeto

```text
.
├── logs/
│   └── system.log         # Arquivo gerado automaticamente contendo os registros
├── utils.js               # Módulo com funções utilitárias (formatação de log)
├── index.js               # Script principal responsável por salvar os logs
├── package.json           # Configuração do Node.js (com "type": "module")
└── README.md              # Documentação do projeto