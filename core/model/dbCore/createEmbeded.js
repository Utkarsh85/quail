var mongoDB = require('mongodb');
var Promise = require('bluebird');
var utils= require('./utils/utils');
var queryUtil= require('./utils/query');

var findOneEmbeded= require('./findOneEmbeded');

module.exports= function (model,obj,embeded,embedParentId) {
	var db = require( '../../db/mongodb/mongodb' ).getDb();

	return new Promise(function (resolve,reject) {

		if(!embedParentId)
		{
			return reject({err:"Embeded Parent ID required"});
		}

		var createObj={};
		obj["_id"]=utils.generate_BSON();
		createObj[model]=obj;

		db.collection(embeded)
		.update(
		   { _id : utils.convert_id_to_BSON_safe(embedParentId) },
		   { $push : createObj }
	    )
		.then(function () {
			return findOneEmbeded(model,obj["_id"],embeded,embedParentId);
		})
		.then(function (docs) {
			return resolve(docs);
		})
		.catch(function (err) {
			return reject(err);
		});
	});
	
}