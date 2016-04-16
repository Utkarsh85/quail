function isValidObjectID(str) {
  // coerce to string so the function can be generically used to test both strings and native objectIds created by the driver
  str = str + '';
  var len = str.length, valid = false;
  if (len == 24) {
    valid = /^[0-9a-fA-F]+$/.test(str);
  }
  return valid;
}

module.exports= function (str) {
	if(!isNaN(str) || isValidObjectID(str))
		return true;
	else
		return false;
}