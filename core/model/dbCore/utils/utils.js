var ObjectID = require('mongodb').ObjectID;
var utils= {};

//This function is expensive
utils.check_ok= function (arr) {
	var ok=true;
	arr.map(function (val) {
		// console.log(val,!val);
		if(!val)
			ok=false;
	});
	// console.log(ok);
	return ok;
}

utils.is_valid_BSON= function (id) {
	if( id.hasOwnProperty('_bsontype') && id._bsontype=='ObjectID')
		return true;
	else
		return false;
}

utils.is_string= function (id) {
	if( typeof(id) === "string")
		return true;
	else
		return false;
}

utils.convert_id_to_BSON= function (id) {
	if( !utils.is_valid_BSON(id) && typeof(id)==="string")
		return new ObjectID(id);
	else
		throw {err:"Error while converting string to bson: Id is not of type string"};
}

utils.convert_id_to_BSON_safe= function (id) {
	if( !utils.is_valid_BSON(id) && typeof(id)==="string")
		return new ObjectID(id);
	else if(utils.is_valid_BSON(id))
		return id;
	else
		throw {err:"Error while converting string to bson: Id is not of type string"};
}

utils.generate_BSON= function () {
		return new ObjectID();
}

utils.isValidObjectID= function (str) {
  // coerce to string so the function can be generically used to test both strings and native objectIds created by the driver
  str = str + '';
  var len = str.length, valid = false;
  if (len == 24) {
    valid = /^[0-9a-fA-F]+$/.test(str);
  }
  return valid;
}


utils.convert_BSON_to_id= function (bson) {
	if( utils.is_valid_BSON(bson))
		return bson.toString();
	else
		throw {err:"Error while converting bson to string id: bson is not of type bson"};
}


module.exports= utils;