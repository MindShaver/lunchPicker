# Lunch Picker API for HipChat

This is a command extension to be used with HipChat that picks a lunch based on existing places.
  - Add a place to eat using `/lunch add {name}`
  - Have a random place picked for lunch using `/lunch`
  - See how many places are being chosen from with `/lunch count`

### New Features!

  - The ability to add a place to eat!
  - The ability to see how many places can be chosen from!

Hosted in Azure using Azure CLI.
Feel free to fork and make a pull request.

### Running Locally
Lunch Picker requires [Node.js](https://nodejs.org/) v6+ to run.
You will also want to create a MongoDB with [MLAB](https://mlab.com/) to associate.
Plug in your MongoURL into lunch.js

Install the dependencies and devDependencies and start the server..

```sh
$ cd mindshaverApi
$ npm install -d
$ npm start
```

Use PostMan to make a POST request.

```
{
  "item" : {
    "message" : {
      "message": "/lunch {params}"
    }
  }
}
```
- A POST request with just `/lunch` will retrieve a random place
- A POST requests must be formatted as a HipChat Request
- A POST request with any other command will return an error

### Parameters : 
- add {Restaurant Name}
- count

### Todos
 - Have a DELETE to get rid of places to eat
 - Have a GET to return all places to eat
 - Move mongodb dependency into a module to be used with more handlers