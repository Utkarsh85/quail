var ExpressBrute = require('express-brute');
var MongoStore = require('express-brute-mongo');

var _bruteforce;
module.exports= {
	
	createObject: function () {
		var store = new MongoStore(function (ready) {
			var db = require( '../../db/mongodb/mongodb' ).getDb();
			ready(db.collection('bruteforce-store'));
		});

		var handleStoreError = function (error) {
		    log.error(error); // log this error so we can figure out what went wrong
		    // cause node to exit, hopefully restarting the process fixes the problem
		    throw {
		        message: error.message,
		        parent: error.parent
		    };
		}
		
		var bruteforce = new ExpressBrute(store,{
		    freeRetries: 20,
		    proxyDepth: 2,
		    // attachResetToRequest: false,
		    refreshTimeoutOnRequest: false,
		    minWait: 1*1000, // 1 day 1 hour (should never reach this wait time)
		    maxWait: 60*1000, // 1 day 1 hour (should never reach this wait time)
		    lifetime: 60*60, // 1 day (seconds not milliseconds)
		    // failCallback: failCallback,
		    handleStoreError: handleStoreError
		});
		_bruteforce= bruteforce;
	},

	getObject:function () {
		return _bruteforce;
	}
}