 //npm install hapi
 //npm i vision inert hapi-swagger
 //npm i hapi-auth-jwt2
 //npm i bcrypt

 //process.env  === as variaveis de ambiente do Node
 
const { config } = require('dotenv');
const path = require('path');
const assert = require('assert');

const env = process.env.NODE_ENV || 'dev';

assert.ok(env === 'prod' || env == 'dev', 'A env é inválida, ou é dev ou prod' );

const configPath = path.join(__dirname,'..','./config', `.env.${env}`);

config({
    path: configPath
});

const Hapi = require('@hapi/hapi');
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema');
const MongoDb = require('./db/strategies/mongodb/mongodb');
const Context = require('./db/strategies/base/contextStrategy');
const HeroRoutes = require('./routes/heroRoutes');
const AuthRoutes = require('./routes/authRoutes');
const HapiSwagger = require('hapi-swagger');
const Vision = require('@hapi/vision');
const Inert = require('@hapi/inert');

const Postgres = require('./db/strategies/postgres/postgres');
const UsuarioSchema = require('./db/strategies/postgres/schemas/usuarioSchema');

const HapiJwt = require('hapi-auth-jwt2');

const JWT_SECRET = process.env.JWT_KEY;

const app = new Hapi.Server({
    //host: 'localhost',
    port: process.env.PORT
});

function mapRoutes(instance, methods){
    return methods.map(method => instance[method]()); 
}

async function main(){
    const connection = MongoDb.connect();
    const context = new Context(new MongoDb(connection, HeroiSchema));

    const connectionPostgres = await Postgres.connect();
    const model = await Postgres.defineModel(connectionPostgres, UsuarioSchema);
    const contextPostgres = new Context(new Postgres(connectionPostgres, model));

    const swaggerOptions = {
        info: {
            title: 'API Herois - #CursoNodeBR',
            version: 'v1.0',
            description: 'Api de hérois com funcionalidades de cadastrar, atualizar, remover e listar'
        }
    }
    await app.register([
        HapiJwt,
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    app.auth.strategy('jwt', 'jwt', {
        key: JWT_SECRET,
/*         
        options: {
            expiresIn: 20
        },  
*/
        validate: async (dado, request) => {
            const [result] = await contextPostgres.read({
                username: dado.username.toLowerCase()
            });

            if(!result){
                return{
                    isValid: false
                }
            }
            //verifica no banco se o usuario continua ativo

            return {
                isValid : true
            }
        }
    });

    app.auth.default('jwt');
    app.route([
        ...mapRoutes(new HeroRoutes(context), HeroRoutes.methods()),
        ...mapRoutes(new AuthRoutes(JWT_SECRET, contextPostgres), AuthRoutes.methods())
    ]);

    await app.start();
    console.log('Application is running on port ',app.info.port);

    return app;
}

module.exports = main();