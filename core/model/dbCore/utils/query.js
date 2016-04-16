var ObjectID = require('mongodb').ObjectID;
var query ={};
var utils= require('./utils');
query.id_obj= function (id) {
	if(!utils.check_ok([id]))
	{
		throw {err:"Expected id to not be undefined"};
	}
	var queryObj={};
	if( utils.is_valid_BSON(id) )
	{
		queryObj._id=id;
		return queryObj;
	}
	else if(utils.is_string(id))
	{
		queryObj._id=new ObjectID(id);
		return queryObj;
	}
	else if(typeof(id)==="object")
	{
		var obj={};

		for(var key in id)
		{
			if(utils.isValidObjectID(id[key]))
				obj[key]=utils.convert_id_to_BSON_safe(id[key]);
			else
				obj[key]=id[key];
		}
		return obj;
	}
	else
	{
		throw {err: "Expected id to be either bson or string or object"};
	}
}


query.embeded_id_obj= function (id,model) {
	if(!utils.check_ok([id]))
	{
		throw {err:"Expected id to not be undefined"};
	}
	var queryObj={};
	if( utils.is_valid_BSON(id) )
	{
		queryObj[model+'._id']=id;
		return queryObj;
	}
	else if(utils.is_string(id))
	{
		queryObj[model+'._id']=new ObjectID(id);
		return queryObj;
	}
	else if(typeof(id)==="object")
	{
		var obj={};

		for(var key in id)
		{
			if(utils.isValidObjectID(id[key]))
				obj[model+'.'+key]=utils.convert_id_to_BSON_safe(id[key]);
			else
				obj[model+'.'+key]=id[key];
		}
		return obj;
	}
	else
	{
		throw {err: "Expected id to be either bson or string or object"};
	}
}

query.$_obj= function (obj,model) {
	var updateObj={};

	for(var key in obj)
	{
		updateObj[model+'.$.'+key]=obj[key];
	}

	return updateObj;
}
module.exports= query;