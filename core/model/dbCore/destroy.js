var mongoDB = require('mongodb');
var Promise = require('bluebird');
var utils= require('./utils/utils');
var queryUtil= require('./utils/query');

var find= require('./find');

module.exports= function (model,selector) {
	var db = require( '../../db/mongodb/mongodb' ).getDb();

	return new Promise(function (resolve,reject) {

		if(!selector)
			selector={};
		
		var selectorObj= queryUtil.id_obj(selector);
		
		var TobeDeleted;
		find(model,selectorObj)
		.then(function (docs) {
			TobeDeleted=docs;

			return db.collection( model ).deleteMany(selectorObj);

		})
		.then(function (docs) {
			// console.log(TobeDeleted,docs, docs.result.ok && docs.result.n);
			if(docs.result.ok)
				resolve(TobeDeleted);
			else
				return resolve([]);
		})
		.catch(function (err) {
			return reject(err);
		});

	});
	
	
}