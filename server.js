const dotenv = require('dotenv')
dotenv.config()
// var express = require('express');
// var app = express.createServer();

let express = require('express');
let http = require('http');
let app = express();
let server = http.createServer(app);

app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res) {
    var model = { title : { main: "hello world!", subtitle: "subtitle" }, layout: false };
    res.render('index.html', model);
});

let port = process.env.PORT || 80;

app.listen(port, function() {
    console.log("Listening on " + port);
});

// dfk