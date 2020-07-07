# API-Hérois - NodeJS
### Exercícios propostos durantes as aulas de NodeJS da Gama Academy para a criação de uma API com NodeJS
Instrutor: Erick Wendel
Acesse o projeto em: https://api-herois-gama.herokuapp.com/documentation

#### Objetivo:
* Construir uma api com as práticas de desenvolvimento orientado a testes. :heavy_check_mark:
* Utilizar o framework HapiJS para desenvolver a api. :heavy_check_mark:
* Fazer os testes com Mocha e Nock. :heavy_check_mark:
* Utilizar o orm Sequelize para criar a base de dados no PostgresSQL. :heavy_check_mark:
* Utilizar o odm Mongoose para criar a base de dados no MongoDB. :heavy_check_mark:
* Utilizar o Design Pattern Strategy para flexibilizar a migração de banco de dados. :heavy_check_mark:
* Implementar a criptografia de senhas com o módulo Bcrypt. :heavy_check_mark:
* Criar variáveis de ambiente para produção e desenvolvimento. :heavy_check_mark:
* Fazer o deploy da aplicação no Heroku. :heavy_check_mark:

#### Como executar o projeto:
##### Requisitos:
* NodeJS LTS ^12.x
* Docker CLI ^19.03.x

* Instale o docker em sua plataforma de preferência:
```
https://docs.docker.com/get-docker/
```
* Execute os seguintes comandos no terminal para criar um container contendo a imagem do MongoDB:
```
docker run
--name mongodb
-p 27017:27017
-e MONGO_INITDB_ROOT_USERNAME=admin
-e MONGO_INITDB_ROOT_PASSWORD=senhaadmin
-d
mongo:4

docker run
--name mongoclient
-p 3000:3000
--link mongodb:mongodb
-d
mongoclient/mongoclient
```
* Execute esses comandos para criar um container com a imagem do PostgresSQL:
```
docker run
--name postgres
-e POSTGRES_USER=erickwendel
-e POSTGRES_PASSWORD=minhasenhasecreta
-e POSTGRES_DB=heroes
-p 5432:5432
-d
postgres

docker ps ou docker ps -a docker exec -it postgres /bin/bash

docker run
--name adminer
-p 8080:8080
--link postgres:postgres
-d
adminer
```
* Execute esses comandos para criar um usuário para escrita e leitura no MongoDB:
```
docker exec -it mongodb
mongo --host localhost -u admin -p senhaadmin --authenticationDatabase admin
--eval "db.getSiblingDB('herois').createUser({user:'erickwendel',pwd:'minhasenhasecreta',roles:[{role: 'readWrite', db: 'herois'}]})"
```
* Nesses comandos também foram criados mais 2 containers adicionais para o acesso dos bancos de dados via interface gráfica, sendo:
```
MongoDB: http://localhost:3000 e Postgres: http://localhost:8080
```
* No terminal e na pasta escolhida faça o clone desse projeto com:
```
git clone https://github.com/edsonbruno415/NodeJS-Gama.git
```
* Navegue até a pasta do projeto:
```
cd NodeJS-Gama
```
* Instale todas as dependências e inicie o projeto em modo de desenvolvimento:
```
npm i && npm t
```
* Pronto! O seu projeto estará rodando! :satisfied:
