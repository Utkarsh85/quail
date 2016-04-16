var jwt = require('jsonwebtoken');
var moment= require('moment');

tokenCreator={};
var secret= process.env.TOKEN_SECRET || 'I hate you like I love you love you love you!!!';

tokenCreator.create = function (id) {
	var payload = {
    base: id,
    code: 4001,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };
  return jwt.sign(payload, secret,{ algorithm: 'HS512'});
}

tokenCreator.createregister = function (id) {
	var payload = {
    base: id,
    code: 4000,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };
  return jwt.sign(payload, secret,{ algorithm: 'HS512'});
}

tokenCreator.verify = function (token) {
	try
	{
		var decoded = jwt.verify(token,secret,{ algorithm: 'HS512'});
	}
	
	catch(err)
	{
		console.log(err);
		return false;
	}
	console.log(decoded);
	if(decoded.exp> moment().unix())
		return true;
	else
		return false;
}

tokenCreator.payload = function (token) {
	return jwt.decode(token,secret,{ algorithm: 'HS512'});
}

module.exports= tokenCreator;