'use strict'

var port = process.env.PORT || 8000

var http = require('http')
var express = require('express')
var bodyParser = require('body-parser')
var swaggerize = require('swaggerize-express')
var swaggerUi = require('swaggerize-ui')
var path = require('path')
var fs = require("fs")
var db = require("./mongo-connect")

fs.existsSync = fs.existsSync || require('path').existsSync

var app = express()

var server = http.createServer(app)

app.use(bodyParser.json())

app.use(swaggerize({
    api: path.resolve('./config/swagger.json'),
    handlers: path.resolve('./handlers'),
    docspath: '/swagger' 
}))

app.use('/docs', swaggerUi({
    docs: '/swagger'  
}))

db.connect(//your mongo url here
    , function(err){
    if (err) {
        console.log('Unable to connect to Mongo.')
        process.exit(1)
    } else {
        app.listen(port, function() {
        })
    }
})