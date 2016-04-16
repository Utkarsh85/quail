var mongoDB = require('mongodb');
var Promise = require('bluebird');

module.exports= function (model,query,sort,limit,skip) {
	var db = require( '../../db/mongodb/mongodb' ).getDb();
	
	var fullQuery= db.collection( model )
	.find(query);
	if(sort)
		fullQuery= fullQuery.sort(sort);
	if(skip)
		fullQuery= fullQuery.skip(skip);
	if(limit)
		fullQuery=fullQuery.limit(limit);

	return fullQuery.toArray();
}