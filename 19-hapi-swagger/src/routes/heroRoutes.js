const BaseRoute = require('./base/baseRoute');
const Joi = require('@hapi/joi');
const Boom = require('boom');

const failAction = (request, headers, error) => {
    throw error;
}

class HeroRoutes extends BaseRoute {
    constructor(db) {
        super();
        this.db = db;
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            options: {
                description: 'Listar todos os Hérois',
                notes: 'Pode paginar resultados e filtrar por nome',
                tags: ['api'],
                validate: {
                    //payload -> body
                    //headers -> headers
                    //params -> na URL:id
                    //query -> ?skip=0&limit=10 
                    failAction,
                    query: Joi.object({
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(10),
                        nome: Joi.string().min(3).max(100)
                    })
                },
                handler: (request) => {
                    try {
                        const {
                            skip,
                            limit,
                            nome
                        } = request.query;
    
                        const query = nome ? {
                            nome: {
                                $regex: `.*${nome}*.`,
                                $options: 'i'
                            }
                        } : {};
    
                        return this.db.read(query, parseInt(skip), parseInt(limit));
                    }
                    catch (error) {
                        console.error('Deu Ruim', error);
                        return Boom.internal();
                    }
                }
            }
        }
    }

    create() {
        return {
            path: '/herois',
            method: 'POST',
            options: {
                description: 'Cadastrar Hérois',
                notes: 'Deve passar um Héroi',
                tags: ['api'],
                validate: {
                    failAction,
                    payload: Joi.object({
                        nome: Joi.string().required().min(3).max(100),
                        poder: Joi.string().required().min(2).max(100)
                    })
                },
                handler: async(request)=>{
                    try{
                        const {
                            nome,
                            poder
                        } = request.payload;
    
                        const result = await this.db.create({ nome, poder });
    
                        return {
                            message: 'Heroi cadastrado com sucesso!',
                            _id: result.id
                        }
                    }
                    catch(error){
                        console.error('DEU RUIM', error);
                        return Boom.internal();
                    }
                }
            }
        }
    }

    update(){
        return {
            path: '/herois/{id}',
            method: 'PATCH',
            options: {
                description: 'Atualizar Hérois pelo id',
                notes: 'Deve atualizar somente um único héroi por vez',
                tags: ['api'],
                validate: {
                    failAction,
                    params: Joi.object({
                        id: Joi.string().required()
                    }),
                    payload: Joi.object({
                        nome: Joi.string().min(3).max(100),
                        poder: Joi.string().min(2).max(100)
                    })
                },
                handler: async(request)=>{
                    try{
                        const {
                            id
                        } = request.params;
    
                        const {
                            payload
                        } = request;
    
                        const dadosString = JSON.stringify(payload);
                        const dados = JSON.parse(dadosString);
    
                        const result = await this.db.update(id, dados);
    
                        if(result.nModified !== 1) return Boom.preconditionFailed('Id não encontrado no banco!');
    
                        return {
                            message: 'Heroi atualizado com sucesso!'
                        }
                    }
                    catch(error){
                        console.error('DEU RUIM', error);
                        return Boom.internal();
                    }
                }
            }
        }
    }

    delete(){
        return {
            path: '/herois/{id}',
            method: 'DELETE',
            options: {
                description: 'Remover Héroi pelo id',
                notes: 'Deve remover somente um único héroi por vez',
                tags: ['api'],
                validate: {
                    failAction,
                    params: Joi.object({
                        id: Joi.string().required()
                    })
                },
                handler: async(request)=>{
                    try{
                        const { id } = request.params;
                        const result = await this.db.delete(id);
    
                        if(result.n !== 1) return Boom.preconditionFailed('Id não encontrado no banco!');
                        return {
                            message: 'Heroi removido com sucesso!'
                        }
                    }
                    catch(error){
                        console.log('DEU RUIM', error);
                        return Boom.internal();
                    }
                }
            }
        }
    }
}

module.exports = HeroRoutes;