var ExpressBrute = require('express-brute');
var MongoStore = require('express-brute-mongo');

var bruteforceConfig= require( require("path").resolve('./config/rateLimit') );

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
		    freeRetries: bruteforceConfig.freeRetries || 20,
		    proxyDepth: bruteforceConfig.proxyDepth || 2,
		    // attachResetToRequest: false,
		    refreshTimeoutOnRequest: false,
		    minWait: bruteforceConfig.minWait || 1*1000, // 1 day 1 hour (should never reach this wait time)
		    maxWait: bruteforceConfig.maxWait || 60*1000, // 1 day 1 hour (should never reach this wait time)
		    lifetime: bruteforceConfig.lifetime || 60*60, // 1 day (seconds not milliseconds)
		    // failCallback: failCallback,
		    handleStoreError: handleStoreError
		});
		_bruteforce= bruteforce;
	},

	getObject:function () {
		return _bruteforce;
	}
}