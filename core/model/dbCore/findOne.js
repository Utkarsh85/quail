var mongoDB = require('mongodb');
var Promise = require('bluebird');
var utils= require('./utils/utils');
var queryUtil= require('./utils/query');

module.exports= function (model,query) {
	var db = require( '../../db/mongodb/mongodb' ).getDb();
	
	return new Promise(function (resolve,reject) {
		if(!query)
			query={};
		queryObj= queryUtil.id_obj(query);
		db.collection( model ).findOne(queryObj,function (err,docs) {
			if(err)
				return reject(err);

			return resolve(docs);
		});
	});
}