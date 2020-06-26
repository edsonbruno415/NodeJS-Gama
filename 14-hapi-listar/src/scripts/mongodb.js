//comandos docker, entrar no container e executar codigos no mongodb

docker ps
docker exec -it f3951ef9b8d6 \
mongo -u erickwendel -p minhasenhasecreta --authenticationDatabase herois

//mostrar databases
show dbs

//mudando contexto para uma database
use herois

//mostrar tabelas (colecoes)
show collections

//inserir varios registros utilizando JS
for (let i = 0; i < 50000; i++) {
    db.herois.insert({
        nome: `Clone-${i}`,
        poder: 'Velocidade',
        dataNascimento: '22/06/1997'
    })
}


//create
db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '22/06/1997'
})

//read
db.herois.find()
db.herois.find({ poder: 'Velocidade' }).pretty()
db.herois.findOne()
db.herois.find().limit(100).sort({ nome: -1 })
db.herois.find({}, { poder: 1 })

//update
//O Update ele adiciona um novo documento naquele indice mencionado, 
//sobrescrevendo tudo que havia ali.
//Update com $set adiciona um novo campo ao documento mencionado pelo id,
//sem sobrecrever outros campos.
//Porem o $set pode adicionar novos campos senao houver o mesmo ja adicionado ao documento,
//adicionando coisas indesejadas.
//Ele modifica somente um registro por padrao
db.herois.update({ _id: ObjectId('5ef1011c0f86754c05dd3113')},
                { $set: { nome: 'Batman'}} )

//delete
db.herois.remove({})
db.herois.remove({ nome: 'Flash'})





