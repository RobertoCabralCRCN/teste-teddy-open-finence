# TeddyOpenFinanceTest

## Índice

- [Instalação](#instalação)
- [Teste Unitário](#teste-unitário)
- [Arquitetura do Projeto](#arquitetura-do-projeto)
- [Observações](#obervações)
- [Itens Pendentes](#todo)

## Instalação

**Instalar repositório:**

- Ter docker e docker compose instalado

1. Acessar o diretório do projeto (TeddyOpenFinanceTeste)

2. Executar o comando de instalação

```bash
$ npm install ou yarn (caso tenha instalado)
```

3. Executar o comando para subir a aplicação no docker

```bash
$ docker compose up -d
```

4. Após executar o comando acima, rodar as migrations para criação das tabelas

```bash
$ yarn migration:run ou npm run migration:run
```

5. Baixar collection para teste de rotas.

## Teste unitário e Teste e2e

**Instalar repositório:**

1. Para rodar os testes unitários e e2e, após a instalação dos pacotes rodar o seguinte comando:

```bash
$ yarn test ou npm run test
```

## Arquitetura do Projeto

```
  Projeto desenvolvido em Typescript.
  Foi criado utilizando a Arquitetura SOLID, DOCKER e DOCKER COMPOSE

  - Bibliotecas utilizadas
  . Express
  . TypeOrm
  . Tsyringe
  . Multer
  . Jest
  . etc

  - Banco de dados utilizado
  . Postgres

```

## Observações

Consegui colocar em prática os principais conceitos que aprendi ao longo dos
meus estudos / experiência com essas tecnologias, além do desafio de ter criado tudo do "zero".
Não fiz a publicação do projeto em ambiente cloud por ter expirado minha conta (versão gratuita) da AWS, porém,
possuo experiência com arquitetura cloud, serverless, criação de lambdas etc.

Ficaram faltando algumas melhorias e refatorações no código, considerando algumas regras de negócio:

## TODO

```
. Salvar base de dados em ambiente cloud para que importação seja chamada via url e não local.
. Testes unitários no módulo de usuário
. Testes e2e no módulo de usuário
. Completar testes e2e no módulo de urls
. Serviço de importação, separado por responsabilidades da regra de negócio.

```
