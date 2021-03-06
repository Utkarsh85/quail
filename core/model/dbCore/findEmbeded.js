var mongoDB = require('mongodb');
var Promise = require('bluebird');
var utils= require('./utils/utils');
var queryUtil= require('./utils/query');

module.exports= function (model,query,embeded,sort,limit,skip,embededId) {
	var db = require( '../../db/mongodb/mongodb' ).getDb();

	return new Promise(function (resolve,reject) {

		if(!query)
			query={};
		var queryObj=queryUtil.embeded_id_obj(query,model);

		if(embededId)
		{
			queryObj["_id"]=queryUtil.id_obj(embededId)._id;
		}
		// console.log(queryObj);

		var $model= "$"+model;
		var $_query={"_id":"$_id"};
		$_query[model]= {"$push":$model};

		// console.log($_query);

		var queryParams=[
		 	{"$match":queryObj},
		 	{"$unwind":$model},
		 	{"$match": queryObj}
		];

		var additionalParams=[];
		if(sort && typeof(sort)==="object")
		{
			additionalParams.push({"$sort" : queryUtil.embeded_id_obj(sort,model)});
		}

		if(skip && !isNaN(parseInt(skip)) && parseInt(skip) >=0)
		{
			additionalParams.push({"$skip" : parseInt(skip)});
		}

		if(limit && !isNaN(parseInt(limit))  && parseInt(limit) >0 )
		{
			additionalParams.push({"$limit" : parseInt(limit)});
		}

		if(additionalParams.length>0)
		{
			additionalParams.map(function (val) {
				queryParams.push(val);
			});
		}

		queryParams.push({"$group":$_query});
		// console.log(queryParams);

		db.collection( embeded )
		.aggregate(queryParams,function (err,docs) {
			// console.log(err);
			if(err)
				return reject(err);
			var arr=[];
			// console.log(docs);
			docs.map(function (val) {
				arr=arr.concat(val[model]);
			});
			return resolve(arr);
		});
	});

}