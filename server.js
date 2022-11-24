const dotenv = require('dotenv');
dotenv.config();


const check_windows_user = require('bindings')('check_windows_user');
console.log(check_windows_user.IsUserNameExist("Practice"));



let express = require('express');
let bodyParser = require('body-parser')
let jsonParser = bodyParser.json();
let http = require('http');
const req = require('express/lib/request');
let app = express();
let server = http.createServer(app);

app.use(express.static(__dirname + '/static'));
app.use(bodyParser.json());


// app.get('/', function(req, res) {
//     var model = { title : { main: "hello world!", subtitle: "subtitle" }, layout: false };
//     res.render('index.html', model);    
// });

const urlencodedParser = express.urlencoded({extended: false});

app.post("/", jsonParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log('start body');
    console.log(request.body);
    console.log('end body');

    let resp = {
        isUserExist: check_windows_user.IsUserNameExist(request.body.user_name),
      };

    response.send(resp);
});

let port = process.env.PORT || 80;

app.listen(port, function() {
    console.log("Listening on " + port);
});
