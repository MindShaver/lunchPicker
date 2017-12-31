'use strict'

var db = require('./../mongo-connect')

module.exports = {
    post: function lunch_post(req, res) {
        var messageTxt = req.body.item.message.message
        var splitMessage = messageTxt.split(' ')
        var command = splitMessage[1]
        if(splitMessage.length === 1) {
            db.get().collection('places').find().toArray(function(err, results){
                if(err) {
                    return console.log(err);
                }
                var length = results.length
                var placeToEat = results[Math.floor(Math.random() * length)]
                var jsonResponse = {
                    "color": "green",
                    "message": "The place to eat is " + placeToEat.name + "!",
                    "notify": false,
                    "message_format": "text"
                }
                res.json(jsonResponse)
            })  
        }
        else if(command === "count") {
            db.get().collection('places').find().toArray(function(err, results){
                if(err) {
                    return console.log(err)
                }

                var length = results.length
                var placeToEat = results[Math.floor(Math.random() * length)]
                var jsonResponse = {
                    "color": "yellow",
                    "message": "Choosing from " + length + " places! (fiestaparrot)",
                    "notify": false,
                    "message_format": "text"
                }

                res.json(jsonResponse)

            })  
        } else if (command === "add" && splitMessage.length !== 2) {
            var restaurant = ""
            for(var i = 2; i < splitMessage.length; i++)
            {
                restaurant += splitMessage[i] + " "
            }
            
            db.get().collection('places').insertOne(
                {
                    name: restaurant
                },
                function (err, res) {
                    if (err) {
                    return console.log(err)
                    }
                })

            var jsonResponse = {
                "color": "green",
                "message": restaurant + "was added successfully! (dealwithitparrot)",
                "notify": false,
                "message_format": "text"
            }

            res.json(jsonResponse)

        } else {
            var jsonResponse = {
                "color": "red",
                "message": "Unknown command (wat). Please reference the README for valid commands.",
                "notify": false,
                "message_format": "text"
            }
            res.json(jsonResponse)
        }
    }
}