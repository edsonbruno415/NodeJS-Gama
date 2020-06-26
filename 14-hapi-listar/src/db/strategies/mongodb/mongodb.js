const ICrud = require('../interfaces/interfaceCrud');
const Mongoose = require('mongoose');
const Herois = require('./schemas/heroisSchema');

const STATUS = {
    0: 'Desconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Desconectando'
}

class MongoDB extends ICrud {
    constructor(connection, Schema) {
        super();
        this._connection = connection;
        this._schema = Schema;
    }

    static connect() {
        Mongoose.connect('mongodb://erickwendel:minhasenhasecreta@localhost:27017/herois',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            function (error) {
                if (error) {
                    console.error('Falha na conexao', error);
                    return;
                }
            });
        const connection = Mongoose.connection;
        return connection;
    }

    async isConnected() {
        const state = STATUS[this._connection.readyState];
        if(state === 'Conectado') return state;

        if(state !== 'Conectando') return state;

        await new Promise(resolve=> setTimeout(resolve, 1000));

        return STATUS[this._connection.readyState];
    }

    async create(item) {
        const heroi = await this._schema.create(item);
        return heroi;
    }

    read(item, skip = 0, limit = 10 ){
        return this._schema.find(item).skip(skip).limit(limit);
    }

    update(id, item){
        return this._schema.updateOne({ _id : id }, { $set: item })
    }

    delete(id){
        return this._schema.deleteOne({ _id : id });
    }
}

module.exports = MongoDB;