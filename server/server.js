//var express        = require('express');
//var app = express();
//var io = require('socket.io');

var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);

// configuration ===========================================
var port = "3000"; 

app.use(bodyParser.json()); 

app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

app.use(bodyParser.urlencoded({ extended: true })); 

app.use(methodOverride('X-HTTP-Method-Override')); 

app.use(express.static(__dirname + '/public')); 

// routes ==================================================
//require('./server/routes')(app); // configure our routes

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});
//io.listen(app);

app.use('/', function(request, respond) {

	respond.text = "hi" 
})

          
exports = module.exports = app;                         
