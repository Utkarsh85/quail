var jwt = require('jsonwebtoken');
var moment= require('moment');
var tokenConfig= require(require('path').resolve('./config/token'));

var secret= tokenConfig.secret || 'I hate you like I love you love you love you!!!';
var algorithm= tokenConfig.algorithm || 'HS512';
var validity= tokenConfig.validity||14;

tokenCreator={};
tokenCreator.create = function (id,obj) {
	var payload = {
    base: id,
    iat: moment().unix(),
    exp: moment().add(validity, 'days').unix()
  };

  if(obj)
  {
	  for(var key in obj)
	  {
	  	if(['base','iat','exp'].indexOf(key) < 0)
		  	payload[key]=obj[key];
	  }	
  }
  return jwt.sign(payload, secret,{ algorithm: algorithm});
}

tokenCreator.verify = function (token) {
	try
	{
		var decoded = jwt.verify(token,secret,{ algorithm: algorithm});
	}
	
	catch(err)
	{
		return false;
	}

	if(decoded.exp> moment().unix())
		return true;
	else
		return false;
}

tokenCreator.payload = function (token) {
	return jwt.decode(token,secret,{ algorithm: algorithm});
}

module.exports= tokenCreator;