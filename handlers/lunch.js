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
        } else if(command === "count") {
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
        } else if(command === "list") {
            db.get().collection('places').find().toArray(function(err, results){
                if(err) {
                    return console.log(err)
                }
                var names = []
                
                for(let i = 0; i < results.length; i++)
                {
                    names.push(results[i].name)
                }

                names.sort();

                var jsonResponse = {
                    "color": "yellow",
                    "message": names.join(', \r\n'),
                    "notify": false,
                    "message_format": "text"
                }

                res.json(jsonResponse)

            })  
        } else if (command === "help") {
            var jsonResponse = {
                "color": "green",
                "message": "Welcome to Lunch Picker! (partyparrot) \r\n The commands we currently support are: \r\n- /lunch \r\n- /lunch add {your restaurant name}\r\n- /lunch list\r\n- /lunch count\r\n- /lunch delete {restaurant name}\r\n- /lunch help\r\nHAPPY LUNCHING!",
                "notify": false,
                "message_format": "text"
            }

            res.json(jsonResponse)

        } else if (command === "delete" && splitMessage.length !== 2) {
            var restaurantToDelete = ""
            for(let i = 2; i < splitMessage.length; i++)
            {
                if(i != splitMessage.length -1)
                {
                    restaurantToDelete += splitMessage[i] + " "
                }
                else {
                    restaurantToDelete += splitMessage[i]
                }
            }

            var query = { name: restaurantToDelete }
            
            db.get().collection('places').deleteMany(query, function (err, doc) {
                if (err) {
                return console.log(err)
                }

                if(doc.result.n === 0)
                {
                    var jsonResponse = {
                        "color": "red",
                        "message": "Could not find " + restaurantToDelete + ". (shrug)",
                        "notify": false,
                        "message_format": "text"
                    }
                    return res.json(jsonResponse)
                }

                var jsonResponse = {
                    "color": "green",
                    "message": doc.result.n + " instance(s) of " + restaurantToDelete + " were deleted successfully! (blondesassyparrot)",
                    "notify": false,
                    "message_format": "text"
                }
    
                res.json(jsonResponse)
            })
        } else if (command === "add" && splitMessage.length !== 2) {
            var restaurant = ""
            for(let i = 2; i < splitMessage.length; i++)
            {
                if(splitMessage[i] === '\\n' || splitMessage[i] === '\\0')
                {
                    var jsonResponse = {
                        "color": "red",
                        "message": "Please don't add newlines or null characters (sadpanda).",
                        "notify": false,
                        "message_format": "text"
                    }
                    return res.json(jsonResponse)
                }
                else if(splitMessage[i] === "@all")
                {
                    var jsonResponse = {
                        "color": "red",
                        "message": "Please don't tag everyone (sadpanda).",
                        "notify": false,
                        "message_format": "text"
                    }
                    return res.json(jsonResponse)
                }

                if(i != splitMessage.length -1)
                {
                    restaurant += splitMessage[i] + " "
                }
                else {
                    restaurant += splitMessage[i]
                }
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
                "message": restaurant + " was added successfully! (dealwithitparrot)",
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