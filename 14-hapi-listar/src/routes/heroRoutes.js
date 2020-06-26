const BaseRoute = require('./base/baseRoute');

class HeroRoutes extends BaseRoute{
    constructor(db){
        super();
        this.db = db;
    }

    list(){
        return {
            path: '/herois',
            method: 'GET',
            handler: (request, headers)=>{
                try{
                    let {
                        skip,
                        limit,
                        nome
                    } = request.query;

                    nome = nome ? { nome : nome } : {};
                    limit = limit ? limit : 10;
                    skip = skip ? skip : 0;

                    if(isNaN(limit)){
                        throw Error('Limit não é um número!');
                    }
                    if(isNaN(skip)){
                        throw Error('Skip nao é um numero!');
                    }
                    return this.db.read(nome, parseInt(skip), parseInt(limit));
                }
                catch(error){
                    console.error('Deu Ruim', error);
                    return 'Erro interno no servidor';
                }
            }
        }
    }


}

module.exports = HeroRoutes;