const http = require('http');
const fs = require('fs');

let IsMainServerWork = false;


// http.get(GetCurrentAddress()+'/favicon.svg',res =>{
//     fs.readFile('./favicon.svg', null, function(err, data)
//     {
//         if (err)
//         {
//             res.writeHead(404);
//             res.write('Файл не найден.');
//             res.end();
//         }

//         res.writeHead(200,{'Content-Type':'image/svg'});
//         res.write(data);
//         res.end();
//     });
// });

http
.createServer((req,res)=>{

    CheckIsMainServerWork();
    
    if(IsMainServerWork)
    {
        res.writeHead(302,{'Location':GetRedirectAddress()});
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

    // if (q.url === '/favicon.ico') {
    //     r.writeHead(200, {'Content-Type': 'image/x-icon'} );
    //     r.end();
    //     console.log('favicon requested');
    //     return;
    //   }

    if(req.url=='/favicon.png')
    {
        fs.readFile('./favicon.png', null, function(err, data)
        {
            if (err)
            {
                res.writeHead(404);
                res.write('Файл не найден.');
                res.end();
            }
    
            res.writeHead(200,{'Content-Type':'image/png'});
            res.write(data);
            res.end();
        });
    }

})
.listen(GetCurrentPort());


function CheckIsMainServerWork()
{
    const req = http.get(GetRedirectAddress(), (res) => {

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

function GetRedirectAddress()
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

function GetCurrentAddress()
{
    return 'http://localhost:'+GetCurrentPort();
}