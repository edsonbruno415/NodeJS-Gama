const { obterPessoas } = require('./service');

Array.prototype.meuReduce = function(callback, initialValue){
    let valorInicial = typeof initialValue !== undefined ? initialValue : this[0];

    for(let index = 0; index < this.length; index++){
        valorInicial = callback(valorInicial, this[index], index, this);
    }
    return valorInicial;
}

async function main(){
    try{
        const { results } = await obterPessoas('a');
/* 
        const names = results.reduce((previous, current, index, array)=>{
            previous.push(current.name);
            return previous;
        },[]);
 */
        const names = results.meuReduce((prev, curr, index, arr )=>{
            prev.push(curr.name);
            return prev;
        },[]);

        console.log('names', names);

        const words = [
            ['Erick','Wendel'],
            ['Nerdzao', 'NodeBR']
        ]

        const frase = words.meuReduce((anterior, proximo)=>{
            return anterior.concat(proximo);
        },[])
        .join(', ');

        console.log('frase: ', frase);
    }
    catch(error){
        console.error('Erro interno', error);
    }
}

main();