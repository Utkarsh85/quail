# Quail
Hassle free mongodb rest app
# Features
* Uses ACL (Access Control List) to better manage routes. So no route management.
* Uses built in JWT Token Authentication.
* Support for prevention of brute force attacks using [express-brute](https://github.com/AdamPflug/express-brute)
* Uses [sails](https://github.com/balderdashy/sails) like models and controllers
* Blueprints to make life easy
* Support for embeded documents to enable transactions

#Installation
```sh
npm install -g quail-cli
```
#Prerequisite
A running instance of mongodb

#Getting Started

1. Create a project by running the command
```sh
quail create <myapp>
```

2. Change directory to your app and npm install
```sh
cd myapp && npm install
```

3. Create a model
```sh
quail add-model user

OR

quail m user
```

4. Create a controller
```sh
quail add-controller user

OR

quail c user
```

5. Run the app
```sh
npm start
```

Quail supports sails like blueprints out of the box but is protected by ACL(access control list). Change your acl to allow the following actions [find , findOne, create, update and destroy] for the user controller 
```javascript
module.exports = {
    routes: {
        authenticated: {},
        not_authenticated: {
        	User:{
        		find: true,
        		findOne: true,
        		create: true,
        		update: true,
        		destroy: true,
        	}
        }
    }
}
```
Now restart the server and send a post request to http://localhost:3000/user with request body
```
*POST to http://localhost:3000/user
{
	name : 'Quail',
}
```

Get all the user by sending a get request to http://localhost:3000/user
```
*GET to http://localhost:3000/user
```

Get a particular user by sending a get request to http://localhost:3000/user/:id
```
*GET to http://localhost:3000/user/:id
```

Update a particular user by sending a put request to http://localhost:3000/user/:id
```
*PUT to http://localhost:3000/user/:id
{
	name:'Quail is awesome'
}
```

Destroy a particular user by sending a delete request to http://localhost:3000/user/:id
```
*DELETE to http://localhost:3000/user/:id
```

* Docs coming soon