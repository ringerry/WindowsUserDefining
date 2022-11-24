const dotenv = require('dotenv');
dotenv.config();

const check_windows_user = require('bindings')('check_windows_user');

let express = require('express');
let bodyParser = require('body-parser')
let jsonParser = bodyParser.json();
let app = express();

app.use(express.static(__dirname + '/static'));
app.use(bodyParser.json());


app.post("/", jsonParser, function (request, response) {
    
    if(!request.body)
    {
        return response.sendStatus(400);
    } 

    console.log('start body');
    console.log(request.body);
    console.log('end body');

    let resp = 
    {
        isUserExist: check_windows_user.IsUserNameExist(request.body.user_name),
    };

    response.send(resp);
});

let port = process.env.PORT || 80;

app.listen(port, function() {
    console.log("Listening on " + port);
});