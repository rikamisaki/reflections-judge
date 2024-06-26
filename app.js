/////////////////////
// PACKAGE IMPORTS //
/////////////////////
// http - Handles server shit
const http = require('http');
// fs - File read/write
const fs = require('fs');
// url - Gets urls from requests
const url = require('url');

//////////////////////
// PAGES DEFINITION //
//////////////////////
const home = fs.readFileSync('./pages/home.html', 'utf-8');
const dashboard = fs.readFileSync('./pages/dashboard.html', 'utf-8');


///////////////////
// CREATE SERVER //
///////////////////
const server = http.createServer((request, response) => {
    let {query, pathname: path} = url.parse(request.url, true);

    ///////////
    // PAGES //
    ///////////

    // Home (signin) Page
    if (path === '/' || path.toLocaleLowerCase() === '/home'){
        response.writeHead(200);
        response.end(home);
    }
    // Dashboard Page
    else if (path.toLocaleLowerCase() === '/dashboard'){
        if (query.username){
            let dashboardResponse = dashboard.replace('{{%USERNAME%}}', query.username);
            response.end(dashboardResponse);
        }
        else{
            response.writeHead(404);
            response.end('404: Page not found');
        }
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