const assert = require('assert');
const api = require('../api');
const Context = require('./../db/strategies/base/contextStrategy');
const PostGres = require('./../db/strategies/postgres/postgres');
const PasswordHelper = require('../helpers/passwordHelper');

const UsuarioSchema = require('./../db/strategies/postgres/schemas/usuarioSchema');
let app = {}
const USER = {
    username: 'xuxa',
    password: '123'
}

const USER_DB = {
    username: USER.username.toLowerCase(),
    password: '$2b$04$Y.OoWTos4YV88dSHV8l5QObp2UPikwXmaVd.Hn3MYTGaR88ZnyH6.'
}
describe('Auth test suite', function(){
    this.beforeAll(async()=>{
        app = await api;

        const connectionPostgres = await PostGres.connect();
        const model = await PostGres.defineModel(connectionPostgres, UsuarioSchema);
        const postgres = await new Context(new PostGres(connectionPostgres, model));
        const result = await postgres.update(null, USER_DB, true);
    });

    it('Deve obter um token', async()=>{
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: USER
        });

        const statusCode = result.statusCode;
        const dados = JSON.parse(result.payload);

        assert.deepEqual(statusCode, 200);
        assert.ok(dados.token.length > 10);
    }); 

    it('Deve retornar não autorizado ao tentar obter um login errado', async()=>{
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                username: 'erickwendel',
                password: '123'
            }
        });

        const statusCode = result.statusCode;
        const dados = JSON.parse(result.payload);

        assert.ok(statusCode === 401);
        assert.deepEqual(dados.error, "Unauthorized");
    });
});