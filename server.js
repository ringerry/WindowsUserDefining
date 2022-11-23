var express = require('express');
var app = express.createServer();

app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res) {
    var model = { title : { main: "hello world!", subtitle: "subtitle" }, layout: false };
    res.render('index.html', model);
});

var port = process.env.PORT || 80;

app.listen(port, function() {
    console.log("Listening on " + port);
});