/**
 * Exemplo: Simulando acesso ao banco de dados de forma assincrona
 * 0 - Obter usuario 
 * 1 - Obter telefone do usuario atraves do id do usuario
 * 2 - Obter endereco do usuario atraves do id do usuario
 * 3 - Exibir na tela o Nome, Endereco e Telefone do usuario
 */

 function obterUsuario(callback){
    setTimeout(()=>{
        return callback(null, {
            id: 4,
            nome: 'Aladdin',
            nascimento: new Date()
        });
    }, 1000);
 }

 function obterTelefone(idUsuario, callback){
    setTimeout(()=>{
        return callback(null, {
            telefone: '4852-2689',
            ddd: '11'
        });
    }, 2000);
 }

 function obterEndereco(idUsuario, callback){
    setTimeout(()=>{
        return callback(null, {
            rua: 'dos bobos',
            numero: 0
        });
    }, 2000);
 }

obterUsuario(function resolverUsuario(error, usuario){
    // null || "" || 0 === false
    if(error){
        console.error('DEU RUIM NO USUARIO', error);
        return;
    }
    console.log(usuario);

    console.time('tempo');
    obterTelefone(usuario.id, function resolverTelefone(error1, telefone){
        if(error1){
            console.error('DEU RUIM NO TELEFONE', error1);
            return;
        }
        console.log(telefone);

        obterEndereco(usuario.id, function resolverEndereco(error2, endereco){
            if(error2){
                console.error('DEU RUIM NO ENDERECO', error2);
                return;
            }
            console.log(endereco);

            console.log(`
                Nome: ${usuario.nome}
                Endereco: ${endereco.rua}, ${endereco.numero}
                Telefone: (${telefone.ddd}) ${telefone.telefone}
            `);
            console.timeEnd('tempo');
        });
    });
});
 //const usuario = obterUsuario();

 //const telefone = obterTelefone(usuario.id);

 //console.log(usuario);

 //console.log(telefone);