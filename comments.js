// create a web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var port = 8000;

var server = http.createServer(function (request, response) {
    var parsedUrl = url.parse(request.url, true);
    var pathname = parsedUrl.pathname;
    var query = parsedUrl.query;
    var id = query.id;

    if (pathname === '/') {
        if (id === undefined) {
            fs.readdir('./data', function (error, fileList) {
                var title = 'Welcome';
                var description = 'Hello, Node.js';
                var list = '<ul>';
                var i = 0;
                while (i < fileList.length) {
                    list = list + `<li><a href="/?id=${fileList[i]}">${fileList[i]}</a></li>`;
                    i++;
                }
                list = list + '</ul>';
                var template = `
                <!doctype html>
                <html>
                <head>
                    <title>WEB1 - ${title}</title>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1><a href="/">WEB</a></h1>
                    ${list}
                    <h2>${title}</h2>
                    <p>${description}</p>
                </body>
                </html>
                `;
                response.writeHead(200);
                response.end(template);
            });
        } else {
            fs.readdir('./data', function (error, fileList) {
                var title = 'Welcome';
                var description = 'Hello, Node.js';
                var list = '<ul>';
                var i = 0;
                while (i < fileList.length) {
                    list = list + `<li><a href="/?id=${fileList[i]}">${fileList[i]}</a></li>`;
                    i++;
                }
                list = list + '</ul>';
                fs.readFile(`data/${id}`, 'utf8', function (err, description) {
                    var title = id;
                    var template = `
                    <!doctype html>
                    <html>
                    <head>
                        <title>WEB1 - ${title}</title>
                        <meta charset="utf-8">
                    </head>
                    <body>
                        <h1><a href="/">WEB</a></h1>
                        ${list}
                        <h2>${title}</h2>
                        <p>${description}</p>
                    </body>
                    </html>
                    `;
                    response.writeHead(200)
                })
            })
        }
    }
});