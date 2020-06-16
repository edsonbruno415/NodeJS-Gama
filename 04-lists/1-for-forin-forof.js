const { obterPessoas } = require('./service');

async function main(){
    try{
        const { results } = await obterPessoas('a');
        const namesFor = [];
        const namesForIn = [];
        const namesForOf = [];

        console.time('for');
        for(let i =0; i < results.length; i++){
            const pessoa = results[i];
            namesFor.push(pessoa.name);
        }
        //console.log('names-for', namesFor);
        console.timeEnd('for');

        console.time('for-in');
        for(let index in results){
            const pessoa = results[index];
            namesForIn.push(pessoa.name);
        }
        //console.log('names-for-in',namesForIn);
        console.timeEnd('for-in');

        console.time('for-of');
        for(let pessoa of results){
            namesForOf.push(pessoa.name);
        }
        //console.log('names-for-of', namesForOf);
        console.timeEnd('for-of');
    }
    catch(err){
        console.log('Erro Interno: ',err);
    }
} 

main();