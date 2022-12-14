<h1 align="center">
    <a href="https://imgbb.com/"><img src="https://play-lh.googleusercontent.com/VHRElOtyT0cnhEwZhgVCR-9vvm5abZ4w02semEMtLxBTMlpg_9N2QOgjdm0ntwSa0Ro" alt="logo-web" border="0" width="100"></a>
    <br>
    Desafio técnico desenvolvido para o processo seletivo da empresa Ewally.
</h1>

## Pré requisitos

- Ter o Node (versao >= 16.15.0) instalado na máquina

## Como executar o projeto

Baixando o projeto:

```bash
$ git clone https://github.com/intwone/ewally-challenge.git
```

Instalando as dependências:

```bash
$ npm install
```

Iniciando o projeto para desenvolvimento

```bash
$ npm run dev
```

Iniciando o projeto para produção

```bash
$ npm run build
```

```bash
$ npm start
```

## Testes

Nessa api temos 2 tipos de testes, `unitário` e de `integração`.

Executando os testes unitários:

```bash
$ npm run test:unit
```

Executando os testes de integração:

```bash
$ npm run test:integration
```

Executando todos os testes:

```bash
$ npm test
```

Verificando a cobertura dos testes:

```bash
$ npm run test:ci
```

## Rotas disponíveis

Observação: Para facilitar os testes das rotas da api, na pasta raiz do projeto terá um arquivo chamado `EWALLY.postman_collection.json` que será a collection com todas as rotas da aplicação.
Com esse arquivo, você poderá importá-lo no Postman ou no Insomia para que possa ter acesso a todas as rotas criadas.

GET /health

```txt
Descrição: Verifica integridade da api

Caso de sucesso:
- status code: 200
- body: {
  "message": "ok"
}

```

POST /person

```txt
Descrição: Cria uma nova pessoa

Body: {
  "cpf": string,
  "name": string
}

Caso de sucesso:
- status code: 200
- response: não retorna nenhuma informação

Caso de erro quando não for informado document ou name:
- status code: 400
- response: {
  "name": "MISSING_PARAM_ERROR",
  "message": "some parameter was not provided"
}

Caso de erro quando o documento não tiver 11 números:
- status code: 400
- response: {
  "name": "INVALID_LENGTH_DOCUMENT_ERROR",
  "message": "the document should be 11 caracters"
}

Caso de erro quando o documento tiver caracteres que não sejam números:
- status code: 400
- response: {
  "name": "INVALID_CHARACTERS_ERROR",
  "message": "the document cannot have special characters"
}

Caso de erro quando o documento já existir na base de dados:
- status code: 400
- response: {
  "name": "DOCUMENT_ALREADY_IN_USE_ERROR",
  "message": "the document is already being used"
}

Caso de erro quando houver algum problema inesperado na aplicação
- status code: 500
- response: {
  "name": "UNEXPECTED_ERROR",
  "message": "an unexpected error occurred"
}
```

GET /persons

```txt
Descrição: Busca todas pessoas cadastradas

Caso de sucesso:
- status code: 200
- response: [{
  "cpf": string,
  "name": string
}]

Caso de erro quando houver algum problema inesperado na aplicação
- status code: 500
- response: {
  "name": "UNEXPECTED_ERROR",
  "message": "an unexpected error occurred"
}
```

GET /person/:cpf

```txt
Descrição: Busca uma pessoa através do cpf

Caso de sucesso:
- status code: 200
- response: {
  "cpf": string,
  "name": string,
}

Caso de erro quando o cpf não tiver 11 números:
- status code: 404
- response: {
  "name": "NOT_EXISTS_ERROR",
  "message": "document does not exist"
}

Caso de erro quando o cpf tiver caracteres que não sejam números:
- status code: 400
- response: {
  "name": "INVALID_CHARACTERS_ERROR",
  "message": "the document cannot have special characters"
}

Caso de erro quando houver algum problema inesperado na aplicação
- status code: 500
- response: {
  "name": "UNEXPECTED_ERROR",
  "message": "an unexpected error occurred"
}
```

DELETE /persons

```txt
Descrição: Deleta todos as persons

Caso de sucesso:
- status code: 200
- response: não retorna nenhuma informação

Caso de erro quando houver algum problema inesperado na aplicação
- status code: 500
- response: {
  "name": "UNEXPECTED_ERROR",
  "message": "an unexpected error occurred"
}
```

POST /relationship

```txt
Descrição: Cria um novo relacionamento

Body: {
  "cpf1": string,
  "cpf2": string
}

Caso de sucesso:
- status code: 200
- response: não retorna nenhuma informação

Caso de erro quando não for informado dois documents:
- status code: 400
- response: {
  "name": "MISSING_PARAM_ERROR",
  "message": "some parameter was not provided"
}

Caso de erro quando os documents não tiverem 11 números:
- status code: 400
- response: {
  "name": "INVALID_LENGTH_DOCUMENT_ERROR",
  "message": "the document should be 11 caracters"
}

Caso de erro quando os documents tiverem caracteres que não sejam números:
- status code: 400
- response: {
  "name": "INVALID_CHARACTERS_ERROR",
  "message": "the document cannot have special characters"
}

Caso de erro quando houver algum problema inesperado na aplicação
- status code: 500
- response: {
  "name": "UNEXPECTED_ERROR",
  "message": "an unexpected error occurred"
}
```

GET /relationships

```txt
Descrição: Busca todos os relacionamentos

Caso de sucesso:
- status code: 200
- response: [{
  "cpf1": string,
  "cpf2": string,
}]

Caso de erro quando houver algum problema inesperado na aplicação
- status code: 500
- response: {
  "name": "UNEXPECTED_ERROR",
  "message": "an unexpected error occurred"
}
```

GET /recommendations/:cpf

```txt
Descrição: Busca as sugestões de amigos

Caso de sucesso:
- status code: 200
- response: [string]

Caso de erro quando o cpf não tiver 11 números:
- status code: 400
- response: {
  "name": "INVALID_LENGTH_DOCUMENT_ERROR",
  "message": "the document should be 11 caracters"
}

Caso de erro quando o document tiver caracteres que não sejam números:
- status code: 400
- response: {
  "name": "INVALID_CHARACTERS_ERROR",
  "message": "the document cannot have special characters"
}

Caso de erro quando houver algum problema inesperado na aplicação
- status code: 500
- response: {
  "name": "UNEXPECTED_ERROR",
  "message": "an unexpected error occurred"
}
```

## Observações

Dentro da pasta src/infra/db terá as duas tabelas fakes (person, relationships) pré preenchidas, assim pode ficar mais fácil de ver os relacionamentos durante os testes, mas se precisar, é possível criar e listar todos os relacionamentos.

Infelizmente, não consegui implementar a lógica para mostrar a lista de recomendações por relevância, tentei algumas estratégias, porém, sem sucesso. Então, deixei a listagem de amigos sem ordem do mais relevante para o menos relevante.
