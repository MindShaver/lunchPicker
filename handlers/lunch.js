'use strict';

const mongo = require('mongodb').MongoClient;

// Use your Mongo URL here
var mongoUrl;
var db;

module.exports = {
    post: function lunch_post(req, res) {
        if(req.body.constructor === Object && Object.keys(req.body).length > 0)
        {
            var messageTxt = req.body.item.message.message;
            var splitMessage = messageTxt.split(' ');
            var command = splitMessage[1];
            if(splitMessage.length === 1)
            {
                mongo.connect(mongoUrl, (err, client) =>{
                    if (err) {
                        return console.log(err);
                    }
    
                    db = client.db('fcc-db');
                    db.collection('places').find().toArray(function(err, results){
                        if(err) {
                            client.close();
                            return console.log(err);
                        }
                        var length = results.length;
                        var placeToEat = results[Math.floor(Math.random() * length)];
                        var jsonResponse = {
                            "color": "green",
                            "message": "The place to eat is " + placeToEat.name + "!",
                            "notify": false,
                            "message_format": "text"
                        }
                        res.json(jsonResponse);
                    });     
                });
            }
            else if(command === "count")
            {
                mongo.connect(mongoUrl, (err, client) =>{
                    if (err) {
                        return console.log(err);
                    }
    
                    db = client.db('fcc-db');
                    db.collection('places').find().toArray(function(err, results){
                        if(err) {
                            client.close();
                            return console.log(err);
                        }
                        var length = results.length;
                        var placeToEat = results[Math.floor(Math.random() * length)];
                        var jsonResponse = {
                            "color": "yellow",
                            "message": "Choosing from " + length + " places! (fiestaparrot)",
                            "notify": false,
                            "message_format": "text"
                        }
                        res.json(jsonResponse);
                    });     
                });
            }
            else if(command === "add" && splitMessage.length !== 2)
            {
                mongo.connect(mongoUrl, (err, client) =>{
                    if (err) {
                        return console.log(err);
                    }
                    var restaurant = "";
                    for(var i = 2; i < splitMessage.length; i++)
                    {
                        restaurant += splitMessage[i] + " ";
                    }

                    db = client.db('fcc-db');
                    
                    db.collection('places').insertOne(
                        {
                            name: restaurant
                        },
                        function (err, res) {
                            if (err) {
                            client.close();
                            return console.log(err);
                            }
                            client.close();
                        })
    
                    var jsonResponse = {
                        "color": "green",
                        "message": restaurant + "was added successfully! (dealwithitparrot)",
                        "notify": false,
                        "message_format": "text"
                    }
                    res.json(jsonResponse);
                });
            }
            else {
                var jsonResponse = {
                    "color": "red",
                    "message": "Unknown command (wat). Please use 'add' and <Restaurant Name>.",
                    "notify": false,
                    "message_format": "text"
                }
                res.json(jsonResponse);
            }
        }
    }
};