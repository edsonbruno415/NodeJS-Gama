const { obterPessoas } = require('./service');

Array.prototype.meuMap = function(callback){
    const novoArray = [];
    for(let i = 0; i < this.length; i++){
        const result = callback(this[i], i , this);
        novoArray.push(result);
    }
    return novoArray;
}

async function main(){
    try{
        const { results } = await obterPessoas('a');

        const names = [];

        console.time('for-each');
        results.forEach((pessoa)=>{
            names.push(pessoa.name);
        });
        console.timeEnd('for-each');

        //console.log('names', names);

        console.time('map');
        const namesMap = results.map((pessoa, indice, array)=>{
            return pessoa.name;
        });
        console.timeEnd('map');

        //console.log('namesMap', namesMap);

        console.time('meuMap');
        const namesMeuMap = results.meuMap((pessoa, indice, array)=>{
            return pessoa.name;
        });
        console.timeEnd('meuMap');

        //console.log('namesMeuMap', namesMeuMap);
    }
    catch(err){
        console.error('Erro interno', err);
    }
}

main(); 