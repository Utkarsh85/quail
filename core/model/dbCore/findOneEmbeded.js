var mongoDB = require('mongodb');
var Promise = require('bluebird');
var utils= require('./utils/utils');
var queryUtil= require('./utils/query');

module.exports= function (model,query,embeded) {
	var db = require( '../../db/mongodb/mongodb' ).getDb();
	
	return new Promise(function (resolve,reject) {
		
		var queryObj={};
		if(!query)
			query={};
		
		queryObj[model]={ "$elemMatch" : queryUtil.id_obj(query) };
		
		db.collection( embeded ).find(queryObj,queryObj).toArray(function (err,docs) {
			if(err)
				return reject(err);

			var arr=[];

			docs.map(function (val) {
				arr=arr.concat(val[model]);
			})
			if(arr.length)
				return resolve(arr[0]);
			else
				return resolve(null);
		});
	});
	
}