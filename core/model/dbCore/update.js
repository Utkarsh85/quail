var mongoDB = require('mongodb');
var Promise = require('bluebird');
var utils= require('./utils/utils');
var queryUtil= require('./utils/query');

var findOne= require('./findOne');

module.exports= function (model,selector,obj,embeded) {
	var db = require( '../../db/mongodb/mongodb' ).getDb();

	return new Promise(function (resolve,reject) {

		var selectObj= queryUtil.id_obj(selector);

		db.collection( model ).updateOne(selectObj,{"$set":obj},function (err,docs) {
			if(err)
				reject(err);

			findOne(model,selectObj)
			.then(function (docs) {
				resolve(docs);
			})
			.catch(function (err) {
				reject(err);
			});				
		});
	});

	
}