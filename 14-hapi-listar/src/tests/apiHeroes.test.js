const assert = require('assert');
const api = require('./../api');

let app = {};

describe('Suite de testes de API Herois', function(){
    this.beforeAll(async()=>{
        app = await api;
    });

    it('listar /herois', async()=>{
        const result = await app.inject({
            method: 'GET',
            url: '/herois'
        });
        const dados = JSON.parse(result.payload);
        const statusCode = result.statusCode;
        assert.deepEqual(statusCode, 200);
        assert.ok(Array.isArray(dados));
    });

    it('Listar /herois - deve retornar somente 3 registros', async ()=>{
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

    it('Listar /herois - deve retornar um erro com limit incorreto', async ()=>{
        const TAMANHO_LIMITE = 'AEEE';
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        });

        assert.deepEqual(result.payload, 'Erro interno no servidor');
    });

    it('Listar /herois - deve filtrar um registro', async ()=>{
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
});