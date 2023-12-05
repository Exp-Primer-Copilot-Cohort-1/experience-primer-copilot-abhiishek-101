// Create a web server
// Create a route that returns a list of comments

const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer((req,res) => {
    const path = url.parse(req.url,true).pathname;
    const query = url.parse(req.url,true).query;
    const method = req.method;
    console.log(path,query,method);

    if(path === '/comments' && method === 'GET') {
        fs.readFile('comments.json','utf-8',(err,data) => {
            if(err) {
                console.log(err);
                res.writeHead(500,{'Content-Type':'text/html'});
                res.end('Internal Server Error');
            } else {
                const comments = JSON.parse(data);
                res.writeHead(200,{'Content-Type':'application/json'});
                res.end(JSON.stringify(comments));
            }
        })
    } else {
        res.writeHead(404,{'Content-Type':'text/html'});
        res.end('Page Not Found');
    }
});

const port = 5000;
server.listen(port,() => {
    console.log(`Server is listening on port ${port}`);
})