var mongoDB = require('mongodb');
var Promise = require('bluebird');
var utils= require('./utils/utils');
var queryUtil= require('./utils/query');

var findOneEmbeded= require('./findOneEmbeded');

module.exports= function (model,selector,obj,embeded) {
	var db = require( '../../db/mongodb/mongodb' ).getDb();
	
	return new Promise(function (resolve,reject) {

		var selectObj=queryUtil.embeded_id_obj(selector,model);

		var updateObj=queryUtil.$_obj(obj,model);

		db.collection(embeded)
		.updateOne(
		   selectObj,
		   { $set : updateObj }
	    )
		.then(function () {
			return findOneEmbeded(model,selectObj[model+"._id"],embeded);
		})
		.then(function (docs) {
			resolve(docs);
		})
		.catch(function (err) {
			reject(err);
		});
	});
}