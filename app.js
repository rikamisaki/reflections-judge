/////////////////////
// PACKAGE IMPORTS //
/////////////////////
const http = require('http');
const fs = require('fs');

///////////
// PAGES //
///////////
const index = fs.readFileSync('./pages/index.html', 'utf-8');


///////////////////
// CREATE SERVER //
///////////////////
const server = http.createServer((request, response) => {
    let path = request.url;

    ///////////
    // PAGES //
    ///////////
    if (path === '/'){
        response.writeHead(200);
        response.end(index);
    }
    else{
        response.writeHead(404);
        response.end('404: Page not found');
    }
});

//////////////////
// START SERVER //
//////////////////
server.listen(8000, '127.0.0.1', () => {
    console.log("Server has started!");
});