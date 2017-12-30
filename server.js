'use strict';

var port = process.env.PORT || 8000; 

var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var swaggerize = require('swaggerize-express');
var swaggerUi = require('swaggerize-ui'); 
var path = require('path');
var fs = require("fs");

fs.existsSync = fs.existsSync || require('path').existsSync;

var app = express();

var server = http.createServer(app);

app.use(bodyParser.json());

app.use(swaggerize({
    api: path.resolve('./config/swagger.json'),
    handlers: path.resolve('./handlers'),
    docspath: '/swagger' 
}));

// change four
app.use('/docs', swaggerUi({
    docs: '/swagger'  
}));
    
server.listen(port, function () {
});