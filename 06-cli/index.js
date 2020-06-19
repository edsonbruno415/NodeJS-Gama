const Commander = require('commander');
const Heroi = require('./heroi');
const database = require('./database');

async function main(){
    Commander
        .version('v1')
        .option('-n, --nome [value]',"Nome do Heroi")
        .option('-p, --poder [value]',"Poder do Heroi")
        .option('-i --id [value]', "Id do Heroi")

        .option('-c, --cadastrar', "Cadastrar um Heroi")
        .option('-l --listar',"Listar Herois")
        .option('-a --atualizar [value]', "Atualizar um heroi pelo id")
        .option('-r --remover ',"Remover um Heroi pelo id")
        .parse(process.argv)

    const heroi = new Heroi(Commander);
    try{
        if(Commander.cadastrar){
            delete heroi.id;
            const resultado = await database.cadastrar(heroi);
            if(!resultado){
                console.error('Heroi nao foi cadastrado!');
                return;
            }
            console.log('Heroi Cadastrado com Sucesso!');
        }
        if(Commander.listar){
            const resultado = await database.listar();
            console.error(resultado);
            return;
        }
        if(Commander.remover){
            const resultado = await database.remover(heroi.id);

            if(!resultado){
                console.error('Não foi possível remover o heroi');
                return;
            }

            console.log('Heroi removido com sucesso!');
        }

        if(Commander.atualizar){
            const idParaAtualizar = parseInt(Commander.atualizar);
            //remover todos os id's que estiverem undefined ou null
            delete heroi.id;
            const dado = JSON.stringify(heroi);
            const heroiAtualizar = JSON.parse(dado);
            const resultado = await database.atualizar( idParaAtualizar, heroiAtualizar );

            if(!resultado){
                console.error('Não foi possível atualizar o heroi');
                return;
            }

            console.log('Heroi Atualizado com sucesso!');
        }
    }
    catch(error){
        console.error('Deu Erro', error);
    }
}

main()