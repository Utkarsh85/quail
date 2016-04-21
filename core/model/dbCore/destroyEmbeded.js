var mongoDB = require('mongodb');
var Promise = require('bluebird');
var utils= require('./utils/utils');
var queryUtil= require('./utils/query');

var findEmbeded= require('./findEmbeded');

module.exports= function (model,selector,embeded) {
	var db = require( '../../db/mongodb/mongodb' ).getDb();

	return new Promise(function (resolve,reject) {

		selector= queryUtil.id_obj(selector);
		var TobeDeleted;

		findEmbeded(model,selector,embeded)
		.then(function (docs) {
			TobeDeleted=docs;

			var selectObj={};

			selectObj[model]= selector;

			// console.log("Selector",selector,selectObj);

			return db.collection(embeded)
			.updateMany(
			   {},
			   { $pull : selectObj }
			);
		})
		.then(function (docs) {
			if(docs.result.ok)
				return resolve(TobeDeleted);
			else
				return reject({err:"Document does not exist"});
		})
		.catch(function (err) {
			return reject(err);
		});
	});
	
}