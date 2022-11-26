
// set up plain express server
const http = require('http');
const fs = require('fs');
const app = require('express')();
const path  = require('path');

let IsMainServerWork = false;

app.get('*', function(req, res) {  

    CheckIsMainServerWork();

    if(IsMainServerWork)
    {
        res.redirect('http://localhost:3333');
    }

    res.sendFile(path.join(__dirname, './index_preloader.html'));
});

let server = app.listen(3332);


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
        console.error(`Ошибки в запросе: ${e.message}`);
        IsMainServerWork = false;
    });

    return IsMainServerWork;
}