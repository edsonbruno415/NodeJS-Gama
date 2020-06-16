const EventEmitter = require('events');
class MeuEvento extends EventEmitter {

}
const evento = new MeuEvento();
/* 
const nomeEvento = 'usuario:click';
evento.on(nomeEvento, function clicar(click) {
  console.log('Usuario clicou', click);
});

let counter = 0;
setInterval(()=>{
  evento.emit(nomeEvento,`no botão OK ${++counter}x`);
}, 1000); 
*/

const stdin = process.stdin;

stdin.addListener('data',(value)=>{
  console.log(`Você digitou: ${value.toString().trim()}`);
})


