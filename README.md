# Lunch Picker API for HipChat

This is a command extension to be used with HipChat that picks a lunch based on existing places.
  - Add a place to eat using /lunch add <name>
  - Have a random place picked for lunch using /lunch

### New Features!

  - The ability to add a place to eat!

Hosted in Azure using Azure CLI.
Feel free to fork and make a pull request.

### Running Locally
Lunch Picker requires [Node.js](https://nodejs.org/) v6+ to run.
Install the dependencies and devDependencies and start the server.

```sh
$ cd mindshaverApi
$ npm install -d
$ npm start
```

Use PostMan to make a POST request.
- A POST request with no body will retrieve a random place
- A POST request with "add" : "RestaurantName" will create a new restaurant for our engineers to possibly eat at
- A POST request with any other command will return an error

### Todos
 - Have a DELETE to get rid of places to eat
 - Have a GET to return all places to eat
 - Move mongodb dependency into a module to be used with more handlers


