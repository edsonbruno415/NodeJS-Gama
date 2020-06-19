const {
    deepEqual, 
    ok
} = require('assert');

const database = require('./database');

const DEFAULT_ITEM_CADASTRAR = {
    nome: 'Flash',
    poder: 'Speed',
    id: 1
}

describe('Suite de manipulação de Herois', ()=>{
    it('Deve pesquisar um heroi usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR;
        const [resultado] = await database.listar(expected.id);
        
        deepEqual(resultado, expected);
    });

/*     it('Deve cadastrar Herois, usando arquivos', async()=>{
        const expected = {};

        ok(null, expected);
    }); */
});