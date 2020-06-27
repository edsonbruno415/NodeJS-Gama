 //npm install hapi
 //npm i vision inert hapi-swagger

const Hapi = require('@hapi/hapi');
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema');
const MongoDb = require('./db/strategies/mongodb/mongodb');
const Context = require('./db/strategies/base/contextStrategy');
const HeroRoutes = require('./routes/heroRoutes');
const HapiSwagger = require('hapi-swagger');
const Vision = require('@hapi/vision');
const Inert = require('@hapi/inert');

const app = new Hapi.Server({
    host: 'localhost',
    port: 5000
});

function mapRoutes(instance, methods){
    return methods.map(method => instance[method]()); 
}

async function main(){
    const connection = MongoDb.connect();
    const context = new Context(new MongoDb(connection, HeroiSchema));
    const swaggerOptions = {
        info: {
            title: 'API Herois - #CursoNodeBR',
            version: 'v1.0',
            description: 'Api de hérois com funcionalidades de cadastrar, atualizar, remover e listar'
        }
    }
    await app.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    app.route(mapRoutes(new HeroRoutes(context), HeroRoutes.methods()));

    await app.start();
    console.log('Application is running on port ',app.info.port);

    return app;
}

module.exports = main();