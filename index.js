var express= require('express');
var mongoOpen= require('./core/db/mongodb/mongodb.js');

var app= express();

app = require('./core/bootstrap/initialize')(app);

// module.exports= function (port) {
// 	mongoOpen.connectToServer( function( err ) {
// 		if(err)
// 			throw err;
// 		//Initiate bruteForce Object Creation
// 		require('./core/middleware/rateLimit/bruteForceObject').createObject();

// 		require('./core/indexing/indexing')()
// 		.then(function (res) {
// 			console.log("Response of indexing",res);
// 		});
// 		var PORT= port || 1337;
// 		console.log('Running Server on port '+PORT);
// 		app.listen(PORT);
// 	});
// }


var quailApp={
	app: function () {
		return app;
	},

	listen: function (port,cb) {
		mongoOpen.connectToServer( function( err ) {
			if(err)
				throw err;
			//Initiate bruteForce Object Creation
			require('./core/middleware/rateLimit/bruteForceObject').createObject();

			require('./core/indexing/indexing')()
			.then(function (res) {
				// console.log("Response of indexing",res);
			})
			.catch(function (err) {
				console.log("Error while starting app : ",err);
				var db= require('./core/db/mongodb/mongodb.js').getDb();
				db.collection('QuailErrors').insert({date:new Date(),label:'critical',err:err})
				.then(function (errors) {
				});
			});
			var PORT= port || 1337;
			// console.log('Running Server on port '+PORT);
			app.listen(PORT,cb);
		});
	}
}


module.exports= quailApp;