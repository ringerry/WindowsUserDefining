const http = require('http');
const fs = require('fs');

let IsMainServerWork = false;

http
.createServer((req,res)=>{

    CheckIsMainServerWork();
    
    if(IsMainServerWork)
    {
        res.writeHead(302,{'Location':'http://localhost:3333'});
        res.end('');
    }

    fs.readFile('./index_preloader.html', null, function(err, data)
    {
        if (err)
        {
            res.writeHead(404);
            res.write('Файл не найден.');
            res.end();
        }

        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(data);
        res.end();
    });

})
.listen(3332);


function CheckIsMainServerWork()
{
    const req = http.get('http://localhost:3333', (res) => {

        if (res.statusCode == 200)
        {
            IsMainServerWork = true;
            console.log( `Ответ 200 IsMainServerWork = ${IsMainServerWork}`);
        }
    });

    req.on('error', (e) => {
        console.error(`Ошибки в ответе или запросе: ${e.message}`);
        IsMainServerWork = false;
    });

    return IsMainServerWork;
}