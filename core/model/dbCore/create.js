var mongoDB = require('mongodb');
var Promise = require('bluebird');

var findOne= require('./findOne');

module.exports= function (model,obj,embeded,embedParentId) {
	var db = require( '../../db/mongodb/mongodb' ).getDb();

	if(!embeded)
	{
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
	else
	{
		return new Promise(function (resolve,reject) {

			if(!embedParentId)
			{
				return reject({err:"Embeded Parent ID required"});
			}
			var createObj={};
			obj["_id"]=new require('mongodb').ObjectID();
			createObj[model]=obj;
			db.collection(embeded).update(
			   { _id : new mongoDB.ObjectID(embedParentId) },
			   { $push : createObj },
			   function (err) {
				if(err)
					return reject(err);
				
				findOne(model,obj["_id"].toJSON(),embeded,embedParentId)
				.then(function (docs) {
					return resolve(docs);
				})
				.catch(function (err) {
					return reject(err);
				});
			});
		});
	}
}