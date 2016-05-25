var mongoDB = require('mongodb');
var utils= require('./utils/utils');
var queryUtil= require('./utils/query');

module.exports= function (model,query,projection) {
	var db = require( '../../db/mongodb/mongodb' ).getDb();
	

		if(!query)
			query={};
		queryObj= queryUtil.id_obj(query);

		var Query;
		if(projection)
		{
			Query= db.collection( model ).findOne(queryObj,projection);
		}
		else
		{
			Query= db.collection( model ).findOne(queryObj);
		}
		return Query;

}