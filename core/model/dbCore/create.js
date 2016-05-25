var mongoDB = require('mongodb');
var Promise = require('bluebird');

var findOne= require('./findOne');

module.exports= function (model,obj,embeded,embedParentId) {
	var db = require( '../../db/mongodb/mongodb' ).getDb();

		return new Promise(function (resolve,reject) {
			db.collection( model ).insert(obj,function (err,docs) {
				if(err)
					return reject(err);
				var created=docs.ops.map(function (val) {
					val._id= val._id.toString();
					return val;
				})
				return resolve(created[0]);
			});
		});
}