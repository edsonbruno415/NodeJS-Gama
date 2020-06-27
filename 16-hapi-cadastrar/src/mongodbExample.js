const Mongoose = require('mongoose');

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

connection.once('open', () => console.log('Database rodando!!!'));

/*
setTimeout(() => {
    const status = {
        0: 'Desconectado',
        1: 'Conectado',
        2: 'Conectando',
        3: 'Desconectando'
    }
    const state = connection.readyState;
    console.log('State: ', state, status[state]);
}, 1000);

0: Desconectado;
1: Conectado;
2: Conectando;
3: Desconectando;
*/

const heroiSchema = new Mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    poder: {
        type: String,
        required: true
    },
    insertedAt: {
        type: Date,
        default: new Date()
    }
});

const model = Mongoose.model('herois', heroiSchema);

async function main() {
    const removeAll = await model.remove({});
    console.log('removeAll', removeAll);

    const resultCadastrar = await model.create([
        {
            nome: 'Batman',
            poder: 'Muito Dinheiro'
        },
        {
            nome: 'Flash',
            poder: 'Velocidade'
        }
    ]);
    console.log('result', resultCadastrar);

    const listItems = await model.find();
    console.log('Items', listItems);
}
main();