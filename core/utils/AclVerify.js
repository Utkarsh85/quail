AclVerify={};
var acl= require(require('path').resolve('./config/acl'));

AclVerify.verify= function (options) {
	
	if(!acl)
		throw {err:"Configure your acl file"};

	try
	{
		
		if(acl.routes[options.auth][options.controller][options.action])
			return true;
		else
			return false;

	}

	catch(err)
	{
		// console.log(err);
		return false;
	}
}

module.exports= AclVerify;