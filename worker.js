
var express = require('express');
var app = express();
var server = require('http').createServer(app);

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/test', function(req, res, next){
    setTimeout(function(){
        res.json({status: 'ok'});
    }, 1000);
});

app.use(function(req, res, next) {
    res.status(400);
});

server.listen(3000);
