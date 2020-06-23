const http = require('http');
const port = 5000;

const server = http.createServer((request, response)=>{
    response.end('Hello Node!');
});

server.listen(port, ()=>{
    console.log('Application is running on : http://localhost:',port);
});