const { obterPessoas } = require('./service');

Array.prototype.meuFilter = function(callback){
    const novoArray = [];

    for(let index in this){
        const result = callback(this[index], index, this);

        if(typeof result !== 'boolean'){
            throw new Error('O valor nao e booleano');
        }

        if(result === true){
            novoArray.push(this[index]);
        }
    }
    return novoArray;
}

async function main(){
    try{
        const { results } = await obterPessoas('a');

/*         const names = results.filter((pessoa, indice, array)=>{
            return pessoa.name.toLowerCase().indexOf('luke') >= 0;
        }); */
        const names = results.meuFilter((pessoa)=>{
            return pessoa.name.toLowerCase().indexOf('lars') >= 0; 
        });

        const namesMap = names.map((pessoa)=>{
            return pessoa.name;
        });
        console.log('names', namesMap);
    }
    catch(err){
        console.error('Erro interno', err);
    }
}

main();