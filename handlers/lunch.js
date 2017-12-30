'use strict';

const mongo = require('mongodb').MongoClient;
const mongoUrl = "mongodb://defaultUser:bearbear@ds119718.mlab.com:19718/fcc-db";
var db;

module.exports = {
    post: function lunch_post(req, res) {
        if(req.body.constructor === Object && Object.keys(req.body).length > 0)
        {
            var placeName = req.body.add;
            if(placeName === null || placeName === undefined)
            {
                var jsonResponse = {
                    "color": "red",
                    "message": "Unknown command (wat). Please use 'add' and <Restaurant Name>",
                    "notify": false,
                    "message_format": "text"
                }
                res.json(jsonResponse);
            }
            else {
                mongo.connect(mongoUrl, (err, client) =>{
                    if (err) {
                        return console.log(err);
                    }

                    db = client.db('fcc-db');
                    
                    db.collection('places').insertOne(
                        {
                            name: placeName
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
                        "message": placeName + " was added successfully! (dealwithitparrot)",
                        "notify": false,
                        "message_format": "text"
                    }
                    res.json(jsonResponse);
                });
            }
        }
        else { 
            mongo.connect(mongoUrl, (err, client) =>{
                if (err) {
                    return console.log(err);
                }

                db = client.db('fcc-db');
                db.collection('places').find().toArray(function(err, results){
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
    }
};