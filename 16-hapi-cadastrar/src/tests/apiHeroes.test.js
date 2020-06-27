const assert = require('assert');
const api = require('./../api');

let app = {};
const MOCK_HEROI_CADASTRAR = {
    nome: 'Chapolin Colorado',
    poder: 'Marreta Bionica'
};

describe.only('Suite de testes de API Herois', function(){
    this.beforeAll(async()=>{
        app = await api;
    });

    it('listar GET /herois', async()=>{
        const result = await app.inject({
            method: 'GET',
            url: '/herois'
        });
        const dados = JSON.parse(result.payload);
        const statusCode = result.statusCode;
        assert.deepEqual(statusCode, 200);
        assert.ok(Array.isArray(dados));
    });

    it('Listar GET /herois - deve retornar somente 3 registros', async ()=>{
        const TAMANHO_LIMITE = 3;
        const NAME = 'Batman';
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        });

        const dados = JSON.parse(result.payload);
        const statusCode = result.statusCode;
        assert.deepEqual(statusCode, 200);
        assert.ok(dados.length === TAMANHO_LIMITE);
    });

    it('Listar GET /herois - deve retornar um erro com limit incorreto', async ()=>{
        const TAMANHO_LIMITE = 'AEEE';
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        });

        const errorResult = {
            "statusCode":400,
            "error":"Bad Request",
            "message":"child \"limit\" fails because [\"limit\" must be a number]",
            "validation":{
                "source":"query",
                "keys":["limit"]
            }
        }
        assert.deepEqual(result.statusCode, 400);
        assert.deepEqual(JSON.parse(result.payload), errorResult);
    });

    it('Listar GET /herois - deve filtrar um registro', async ()=>{
        const TAMANHO_LIMITE = 100;
        const NAME = 'Batman';
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}&nome=${NAME}`
        });

        const dados = JSON.parse(result.payload);
        const statusCode = result.statusCode;
        assert.deepEqual(statusCode, 200);
        assert.deepEqual(dados[0].nome, NAME);
    });

    it.only('Cadastrat POST /herois - cadastrar um registro', async()=>{
        const result = await app.inject({
            method: 'POST',
            url: '/herois',
            payload: MOCK_HEROI_CADASTRAR
        });

        const statusCode = result.statusCode;

        const { message, _id } = JSON.parse(result.payload);

        assert.ok(statusCode === 200);
        assert.notStrictEqual(_id, undefined);
        assert.deepEqual(message, 'Heroi cadastrado com sucesso!');
    });
});