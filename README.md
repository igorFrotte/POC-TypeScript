<h1 align="center">Tasks POC</h1>

## Objetivo do projeto

Esse projeto é uma POC para adiquirir maior familiaridade com o TypeScript.

## Descrição

É um projeto de organização pessoal, onde podemos: armazenar tarefas, listar todas as tarefas , tarefas expecíficas e a quantidade de tarefa por usuário, completa-las assim que forem concluídas e deletá-las quando necessário.

## Tecnologias Utilizadas

<div>
<img alt="Node.js" width="50" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/nodejs/nodejs.png" />
<img alt="Express" width="50" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/express/express.png" />
<img alt="TypeScript" width="50" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/typescript/typescript.png" />
<img alt="Postgres" width="50" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/postgresql/postgresql.png" />
</div>

## Como Rodar?

1- Clone o repositório </br>
2- Instale as dependências:
```bash
npm i
```
3- Crie a Database no Postgres </br>
4- Popule a Database com os comandos no arquivo dump.sql </br>
5- Execute o back-end em desenvolvimento:
```bash
npm run dev
```
# Documentação

## Criar uma tarefa

`Post /task`

    Status: 201 Created
            422 Unprocessable Entity
            500 Internal Server Error
### Body
  ```
  {
    "name": "andar",
    "description": "andar na praia",
    "day": "2022-11-22",
    "status": "uncompleted",
    "userId": 1
  }
  ```
## Listar todas as tarefas

`GET /task`

    Status: 200 OK
            500 Internal Server Error
### Resposta
 ```
 [
  {
    "id": 1,
    "userId": 1,
    "name": "jogar",
    "description": "jogar lol",
    "day": "2022-11-15T03:00:00.000Z",
    "status": "completed"
  },
  {
    "id": 4,
    "userId": 1,
    "name": "comer",
    "description": "comer arroz",
    "day": "2022-11-18T03:00:00.000Z",
    "status": "uncompleted"
  }
 ]
 ```
## Buscar uma tarefa pelo id

`GET /task/:id`

    Status: 200 OK
            400 Bad Request
            404 Not Found
            500 Internal Server Error
### Resposta
 ```
{
  "id": 1,
  "userId": 1,
  "name": "jogar",
  "description": "jogar lol",
  "day": "2022-11-15T03:00:00.000Z",
  "status": "completed"
}
 ```
## Completar uma tarefa pelo id

`PUT /task/:id`

    Status: 200 OK
            400 Bad Request
            404 Not Found
            409 Conflict
            500 Internal Server Error
## Deletar uma tarefa pelo id

`DELETE /task/:id`

    Status: 200 OK
            400 Bad Request
            404 Not Found
            500 Internal Server Error
## Quantidade de tarefas de um usuário pelo seu id

`GET /count/:id`

    Status: 200 OK
            400 Bad Request
            404 Not Found
            500 Internal Server Error
### Resposta
 ```
4
 ```

    
