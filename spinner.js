const http = require('http');
const fs = require('fs');

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
            RedirectToMainServer();
        }

        res.write(data);
        res.end();
    });
}

const server = http.createServer(requestListener);
server.listen(3332);

console.log('Отдельный сервер для загрузки страницы.')

const options = {
    hostname: 'localhost',
    port: 3333,
    path: '/',
    method: 'GET',
    headers: {
      'Content-Type': 'text/html'
    }
  };
  
  const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${res.headers}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
      console.log('Данные больше нет.');
    });
  });
  