var http = require('http'),
    fs = require('fs');

http.createServer(function(request, response) {
    var body = '';

    request.method // 'POST' // 'GET'

    if (request.url === '/schedule.json') {
        response.writeHead(200, {'Content-Type': 'application/json' });
    }

    if (request.method === 'POST') {
        request.on('data', function (dataNew) {
            var usersJsonContent;

            fs.readFile(request.url.slice(1), function (error, data) {
                usersJsonContent = JSON.parse(data);
                usersJsonContent.push( JSON.parse(dataNew) );

                fs.writeFile('schedule.json', JSON.stringify(usersJsonContent, '', '    '), 'utf-8');
                response.end();
            });

        });
    }
    if (request.method === 'GET') {
        fs.readFile(request.url.slice(1), function (error, data) {
            response.end(data);
        });
    }


}).listen(63342);
