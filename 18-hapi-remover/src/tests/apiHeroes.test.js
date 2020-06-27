const assert = require('assert');
const api = require('./../api');

let app = {};
const MOCK_HEROI_CADASTRAR = {
    nome: 'Chapolin Colorado',
    poder: 'Marreta Bionica'
};
const MOCK_HEROI_INICIAL = {
    nome: 'Gavião Arqueiro',
    poder: 'Flechas precisas'
}
let MOCK_ID = '';
describe('Suite de testes de API Herois', function(){
    this.beforeAll(async()=>{
        app = await api;
        const result = await app.inject({
            method: 'POST',
            url: '/herois',
            payload: JSON.stringify(MOCK_HEROI_INICIAL)
        });
        const dados = JSON.parse(result.payload);
        MOCK_ID = dados._id;
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

    it('Cadastrat POST /herois - cadastrar um registro', async()=>{
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

    it('Atualizar PATCH /herois - atualizar um registro', async()=>{
        const _id = MOCK_ID;
        const expected = {
            poder: 'Super Mira'
        }
        const result = await app.inject({
            method: 'PATCH',
            url: `/herois/${_id}`,
            payload: JSON.stringify(expected)
        });

        const statusCode = result.statusCode;
        const dados = JSON.parse(result.payload);

        assert.ok(statusCode === 200);
        assert.deepEqual(dados.message, 'Heroi atualizado com sucesso!');
    });

    it('Atualizar PATCH /herois - Não deve atualizar com um id incorreto', async()=>{
        const _id = '5ef69cd2eb733a40e820e06e';

        const result = await app.inject({
            method: 'PATCH',
            url: `/herois/${_id}`,
            payload: JSON.stringify({
                poder: 'Super Mira'
            })
        });

        const statusCode = result.statusCode;
        const dados = JSON.parse(result.payload);
        const expected = {
            statusCode: 412,
            error: 'Precondition Failed',
            message: 'Id não encontrado no banco!'
        }
          
        assert.ok(statusCode === 412);
        assert.deepEqual(dados, expected);
    });

    it('Remover DELETE /herois - remover um registro', async()=>{
        const _id = MOCK_ID;
        const result = await app.inject({
            method: 'DELETE',
            url: `/herois/${_id}`
        });
        const statusCode = result.statusCode;
        const dados = JSON.parse(result.payload);

        assert.ok(statusCode === 200);
        assert.deepEqual(dados.message, 'Heroi removido com sucesso!');
    });

    it('Remover DELETE /herois - id não deve remover', async()=>{
        const _id = '5ef69cd2eb733a40e820e06e';
        const result = await app.inject({
            method: 'DELETE',
            url: `/herois/${_id}`
        });
        const statusCode = result.statusCode;
        const dados = JSON.parse(result.payload);

        const expected = {
            statusCode: 412,
            error: 'Precondition Failed',
            message: 'Id não encontrado no banco!'
        }  
        assert.ok(statusCode === 412);
        assert.deepEqual(dados, expected);
    });

    it('Remover DELETE /herois/:id - Não deve remover com id inválido', async()=>{
        const _id = 'ID_INVALIDO';
        const result = await app.inject({
            method: 'DELETE',
            url: `/herois/${_id}`
        });
        const statusCode = result.statusCode;
        const dados = JSON.parse(result.payload);

        const expected = {
            error: 'Internal Server Error',
            message: 'An internal server error occurred',
            statusCode: 500
        }

        assert.ok(statusCode === 500);
        assert.deepEqual(dados, expected);
    });
});