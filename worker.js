var express = require('express');
var app = express();
var server = require('http').createServer(app);
var bodyParser = require('body-parser');

var crypto = require('crypto');

function randomValueHex (len) {
    return crypto.randomBytes(Math.ceil(len/2))
        .toString('hex') // convert to hexadecimal format
        .slice(0,len);   // return required number of characters
}

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

var testVal = randomValueHex(randomInt(10, 99)); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/test', function(req, res, next){
    setTimeout(function(){
        res.json({status: 'ok', data: testVal});
    }, 1000);
});

app.use(function(req, res, next) {
    res.status(400);
});

// this function is called when you want the server to die gracefully
// i.e. wait for existing connections
var gracefulShutdown = function() {
  console.log("Received kill signal, shutting down gracefully.");
  server.close(function() {
    console.log("Closed out remaining connections.");
    process.exit()
  });
  
   // if after 
   setTimeout(function() {
       console.error("Could not close connections in time, forcefully shutting down");
       process.exit()
   }, 2*60*1000);
}

// listen for TERM signal .e.g. kill 
process.on ('SIGTERM', gracefulShutdown);

// listen for INT signal e.g. Ctrl-C
process.on ('SIGINT', gracefulShutdown); 

server.listen(3000);