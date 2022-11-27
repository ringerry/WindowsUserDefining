const http = require('http');
const fs = require('fs');

let IsMainServerWork = false;

http
.createServer((req,res)=>{

    CheckIsMainServerWork();
    
    if(IsMainServerWork)
    {
        res.writeHead(302,{'Location':GetRedirectAdress()});
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
.listen(GetCurrentPort());

// process.argv.forEach(function (val, index, array) {
//     console.log(index + ': ' + val);
// });

function CheckIsMainServerWork()
{
    const req = http.get(GetRedirectAdress(), (res) => {

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

function GetRedirectAdress()
{
    if(process.argv.length<3)
    {
        return 'http://localhost:3333';
    }

    return 'http://localhost' + ':' + process.argv[3];
}

function GetCurrentPort()
{
    if(process.argv.length<3)
    {
        return '3332';
    }

    return process.argv[2];
}