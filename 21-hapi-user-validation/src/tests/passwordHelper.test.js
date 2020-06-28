const assert = require('assert');
const PasswordHelper = require('../helpers/passwordHelper');

const SENHA = '123';
let hash;

describe('UserHelper test suite', function(){
    it('Deve gerar um hash a partir de uma senha', async()=>{
        const result = await PasswordHelper.hashPassword(SENHA);
        hash = result;

        assert.ok(result.length > 10);
    });

    it('Deve comparar o hash com a senha', async()=>{
        const result = await PasswordHelper.comparePassword(SENHA, hash);

        assert.ok(result);
    });
});