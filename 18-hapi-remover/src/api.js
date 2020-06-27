 //npm install hapi
const Hapi = require('hapi');
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema');
const MongoDb = require('./db/strategies/mongodb/mongodb');
const Context = require('./db/strategies/base/contextStrategy');
const HeroRoutes = require('./routes/heroRoutes');
const app = new Hapi.Server({
    port: 5000
});

function mapRoutes(instance, methods){
    return methods.map(method => instance[method]()); 
}

async function main(){
    const connection = MongoDb.connect();
    const context = new Context(new MongoDb(connection, HeroiSchema));

    app.route([
        ...mapRoutes(new HeroRoutes(context), HeroRoutes.methods())
    ]);

    await app.start();
    console.log('Application is running on port ',app.info.port);

    return app;
}

module.exports = main();