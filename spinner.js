
// set up plain express server
const app = require('express')();

// set up route to redirect all routes to port 3000
// note this only works for GET requests, things like POST from your code or forms 
//   must specify the proper port 3000
// app.get('*', function(req, res) {  
//     res.redirect('http:3000//' + req.headers.host + req.url);
// });

// have it listen on 80
// app.listen(3332);

// const http = require('http');
// const fs = require('fs');

// var net = require('net');

// // parse "80" and "localhost:80" or even "42mEANINg-life.com:80"
// var addrRegex = /^(([a-zA-Z\-\.0-9]+):)?(\d+)$/;

// var addr = {
//     from: addrRegex.exec(process.argv[2]),
//     to: addrRegex.exec(process.argv[3])
// };

// if (!addr.from || !addr.to) {
//     console.log('Usage: <from> <to>');
//     return;
// }

// net.createServer(function(from) {
//     var to = net.createConnection({
//         host: addr.to[2],
//         port: addr.to[3]
//     });
//     from.pipe(to);
//     to.pipe(from);
// }).listen(addr.from[3], addr.from[2]);

const requestListener = function (req, res) {
    res.writeHead(200,{'Content-Type':'text/html'});
    fs.readFile('./static/index.html', null, function(err, data)
    {
    if (err)
    {
        res.writeHead(404);
        res.write('Файл не найден.');
        res.end();
    }
        if(IsMainServerWork())
        {
            res.redirect('http:3000//' + req.headers.host + req.url);
        }

        res.write(data);
        res.end();
    });
}

function IsMainServerWork()
{
    return true;
}

// const server = http.createServer(requestListener);
// server.listen(3332);

// console.log('Отдельный сервер для загрузки страницы.')

// const options = {
//     hostname: 'localhost',
//     port: 3333,
//     path: '/',
//     method: 'GET',
//     headers: {
//       'Content-Type': 'text/html'
//     }
//   };
  
//   const req = http.request(options, (res) => {
//     console.log(`STATUS: ${res.statusCode}`);
//     console.log(`HEADERS: ${res.headers}`);
//     res.setEncoding('utf8');
//     res.on('data', (chunk) => {
//       console.log(`BODY: ${chunk}`);
//     });
//     res.on('end', () => {
//       console.log('Данные больше нет.');
//     });
//   });
  