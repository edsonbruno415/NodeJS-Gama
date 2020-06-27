//npm install hapi
const Hapi = require('hapi');
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema');
const MongoDb = require('./db/strategies/mongodb/mongodb');
const Context = require('./db/strategies/base/contextStrategy');
const app = new Hapi.Server({
    port: 5000
});

async function main(){
    const connection = MongoDb.connect();
    const context = new Context(new MongoDb(connection, HeroiSchema));

    app.route([{
        path: '/herois',
        method: 'GET',
        handler: (request, handler)=>{
            return context.read();
        }
    }]);

    await app.start();
    console.log('Application is running on port ',app.info.port);
}
main();